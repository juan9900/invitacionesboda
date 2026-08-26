import 'server-only'
import { createClient } from '@/lib/supabase/server'

export type Event = {
  id: number
  ceremonia_titulo: string
  ceremonia_fecha: string
  ceremonia_lugar: string
  ceremonia_direccion: string | null
  ceremonia_mapa_url: string | null

  fiesta_titulo: string | null
  fiesta_fecha: string | null
  fiesta_lugar: string | null
  fiesta_direccion: string | null
  fiesta_mapa_url: string | null

  rsvp_deadline: string
  mensaje_whatsapp_tpl_individual: string
  mensaje_whatsapp_tpl_pareja: string
  mensaje_whatsapp_tpl_familia: string
  mensaje_whatsapp_tpl_cortesia: string
}

export async function getEvent(): Promise<Event> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('event')
    .select('*')
    .eq('id', 1)
    .single()
  if (error) throw error
  return data as Event
}
