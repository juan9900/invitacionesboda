'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { isAdmin } from '@/lib/auth'

const optionalText = z
  .string()
  .trim()
  .transform((v) => (v === '' ? null : v))
  .nullable()

const requiredText = z.string().trim().min(1, 'Requerido')

const datetime = z
  .string()
  .trim()
  .min(1, 'Requerido')
  .transform((v) => new Date(v).toISOString())

const EventInput = z.object({
  ceremonia_titulo: requiredText,
  ceremonia_fecha: datetime,
  ceremonia_lugar: requiredText,
  ceremonia_direccion: optionalText,
  ceremonia_mapa_url: optionalText,

  fiesta_titulo: optionalText,
  fiesta_fecha: z
    .string()
    .trim()
    .transform((v) => (v === '' ? null : new Date(v).toISOString()))
    .nullable(),
  fiesta_lugar: optionalText,
  fiesta_direccion: optionalText,
  fiesta_mapa_url: optionalText,

  rsvp_deadline: datetime,
  mensaje_whatsapp_tpl_individual: requiredText,
  mensaje_whatsapp_tpl_pareja: requiredText,
  mensaje_whatsapp_tpl_familia: requiredText,
})

export async function updateEvent(formData: FormData) {
  if (!(await isAdmin())) throw new Error('Unauthorized')

  const ceremoniaLugar = String(formData.get('ceremonia_lugar') ?? '')

  const parsed = EventInput.parse({
    ceremonia_titulo: ceremoniaLugar,
    ceremonia_fecha: formData.get('ceremonia_fecha') ?? '',
    ceremonia_lugar: ceremoniaLugar,
    ceremonia_direccion: formData.get('ceremonia_direccion') ?? '',
    ceremonia_mapa_url: formData.get('ceremonia_mapa_url') ?? '',

    fiesta_titulo: formData.get('fiesta_titulo') ?? '',
    fiesta_fecha: formData.get('fiesta_fecha') ?? '',
    fiesta_lugar: formData.get('fiesta_lugar') ?? '',
    fiesta_direccion: formData.get('fiesta_direccion') ?? '',
    fiesta_mapa_url: formData.get('fiesta_mapa_url') ?? '',

    rsvp_deadline: formData.get('rsvp_deadline') ?? '',
    mensaje_whatsapp_tpl_individual:
      formData.get('mensaje_whatsapp_tpl_individual') ?? '',
    mensaje_whatsapp_tpl_pareja:
      formData.get('mensaje_whatsapp_tpl_pareja') ?? '',
    mensaje_whatsapp_tpl_familia:
      formData.get('mensaje_whatsapp_tpl_familia') ?? '',
  })

  const supabase = createAdminClient()
  const { error } = await supabase.from('event').update(parsed).eq('id', 1)
  if (error) throw error

  revalidatePath('/admin')
  revalidatePath('/admin/evento')
}
