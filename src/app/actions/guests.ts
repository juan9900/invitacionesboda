'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdmin } from '@/lib/auth'
import { newSlug } from '@/lib/slug'

const GuestInput = z.object({
  nombres: z.string().min(1).max(120),
  pases: z.coerce.number().int().min(1).max(20),
  telefono: z
    .string()
    .trim()
    .regex(/^\+\d{6,15}$/, 'Teléfono debe empezar por + y solo dígitos')
    .or(z.literal(''))
    .transform((v) => (v === '' ? null : v))
    .nullable(),
})

async function assertAdmin() {
  if (!(await isAdmin())) throw new Error('Unauthorized')
}

export async function createGuest(formData: FormData) {
  await assertAdmin()
  const parsed = GuestInput.parse({
    nombres: formData.get('nombres'),
    pases: formData.get('pases'),
    telefono: formData.get('telefono') ?? '',
  })

  const supabase = createAdminClient()

  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = newSlug()
    const { error } = await supabase
      .from('guests')
      .insert({ ...parsed, slug })
    if (!error) {
      revalidatePath('/admin')
      return { ok: true, slug }
    }
    if (error.code !== '23505') throw error
  }
  throw new Error('No se pudo generar un slug único')
}

export async function updateGuest(id: string, formData: FormData) {
  await assertAdmin()
  const parsed = GuestInput.parse({
    nombres: formData.get('nombres'),
    pases: formData.get('pases'),
    telefono: formData.get('telefono') ?? '',
  })

  const supabase = createAdminClient()
  const { error } = await supabase.from('guests').update(parsed).eq('id', id)
  if (error) throw error
  revalidatePath('/admin')
  revalidatePath(`/admin/${id}`)
}

export async function setEnviado(id: string, enviado: boolean) {
  await assertAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('guests').update({ enviado }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin')
}

export async function deleteGuest(id: string) {
  await assertAdmin()
  const supabase = createAdminClient()
  const { error } = await supabase.from('guests').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin')
}

const ManualRsvp = z.object({
  confirmado: z.enum(['si', 'no', 'reset']),
  pases_confirmados: z.coerce.number().int().min(0).optional(),
})

export async function setRsvpManual(id: string, formData: FormData) {
  await assertAdmin()
  const parsed = ManualRsvp.parse({
    confirmado: formData.get('confirmado'),
    pases_confirmados: formData.get('pases_confirmados') ?? undefined,
  })

  const supabase = createAdminClient()
  let update: Record<string, unknown>
  if (parsed.confirmado === 'reset') {
    update = {
      confirmado: null,
      pases_confirmados: null,
      confirmado_at: null,
    }
  } else if (parsed.confirmado === 'si') {
    update = {
      confirmado: true,
      pases_confirmados: parsed.pases_confirmados ?? 1,
      confirmado_at: new Date().toISOString(),
    }
  } else {
    update = {
      confirmado: false,
      pases_confirmados: 0,
      confirmado_at: new Date().toISOString(),
    }
  }

  const { error } = await supabase.from('guests').update(update).eq('id', id)
  if (error) throw error
  revalidatePath('/admin')
  revalidatePath(`/admin/${id}`)
}
