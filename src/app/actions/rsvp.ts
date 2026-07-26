'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const RsvpInput = z.object({
  slug: z.string().min(1).max(64),
  confirmado: z.enum(['si', 'no']),
  pases_confirmados: z.coerce.number().int().min(0).optional(),
})

export type RsvpResult =
  | { ok: true }
  | { ok: false; error: string }

export async function submitRsvp(
  _prev: RsvpResult | null,
  formData: FormData,
): Promise<RsvpResult> {
  let parsed
  try {
    parsed = RsvpInput.parse({
      slug: formData.get('slug'),
      confirmado: formData.get('confirmado'),
      pases_confirmados: formData.get('pases_confirmados') ?? undefined,
    })
  } catch {
    return { ok: false, error: 'Datos inválidos.' }
  }

  const supabase = await createClient()

  const { data: guest, error: gErr } = await supabase
    .from('guests')
    .select('id, pases')
    .eq('slug', parsed.slug)
    .single()
  if (gErr || !guest) return { ok: false, error: 'Invitación no encontrada.' }

  const confirmado = parsed.confirmado === 'si'
  const pases_confirmados = confirmado
    ? Math.min(parsed.pases_confirmados ?? guest.pases, guest.pases)
    : 0

  const { error } = await supabase
    .from('guests')
    .update({
      confirmado,
      pases_confirmados,
      confirmado_at: new Date().toISOString(),
    })
    .eq('slug', parsed.slug)

  if (error) {
    if (error.message.includes('RSVP deadline')) {
      return { ok: false, error: 'El plazo de confirmación ha terminado.' }
    }
    return { ok: false, error: 'No se pudo guardar tu respuesta.' }
  }

  revalidatePath(`/${parsed.slug}`)
  return { ok: true }
}
