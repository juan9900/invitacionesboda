import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getEvent } from '@/lib/event'
import Envelope from './envelope'
import MusicProvider from './music-player'
import BotanicalVersion from './_versions/botanical-client'
import type { InviteData } from './_versions/shared'

export const dynamic = 'force-dynamic'

type Guest = {
  id: string
  slug: string
  nombres: string
  pases: number
  confirmado: boolean | null
  pases_confirmados: number | null
  cortesia: boolean
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: guest } = await supabase
    .from('guests')
    .select('id, slug, nombres, pases, confirmado, pases_confirmados, cortesia')
    .eq('slug', slug)
    .maybeSingle<Guest>()

  if (!guest) notFound()

  const event = await getEvent()
  const deadlinePassed = new Date(event.rsvp_deadline) < new Date()
  const fechaCeremonia = new Date(event.ceremonia_fecha)

  // ceremonia_fecha / fiesta_fecha se guardan como "hora de reloj" fija en
  // UTC (ver actions/event.ts), así que siempre formateamos con timeZone:
  // 'UTC' para que la hora mostrada sea siempre la hora tipeada en el admin,
  // sin importar el huso horario del servidor ni del dispositivo del invitado.
  const fmtFecha = (d: Date) =>
    d.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
  const fmtHora = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })
      .replace(/\s?(AM|PM)$/i, (_, p) => ` ${p.toLowerCase()}`)

  const fechaFiesta = event.fiesta_fecha ? new Date(event.fiesta_fecha) : null

  const dia     = fechaCeremonia.toLocaleDateString('es-ES', { day: '2-digit', timeZone: 'UTC' })
  const mes     = fechaCeremonia.toLocaleDateString('es-ES', { month: 'long', timeZone: 'UTC' }).toUpperCase()
  const anio    = String(fechaCeremonia.getUTCFullYear()).slice(-2)
  const weekday = fechaCeremonia.toLocaleDateString('es-ES', { weekday: 'long', timeZone: 'UTC' })
  const hora    = fmtHora(fechaCeremonia)

  const data: InviteData = {
    slug:                  guest.slug,
    nombres:               guest.nombres,
    pases:                 guest.pases,
    confirmado:            guest.confirmado,
    pases_confirmados:     guest.pases_confirmados,
    cortesia:              guest.cortesia,

    ceremonia_lugar:       event.ceremonia_lugar,
    ceremonia_fecha_iso:   event.ceremonia_fecha,
    ceremonia_direccion:   event.ceremonia_direccion ?? null,
    ceremonia_mapa_url:    event.ceremonia_mapa_url ?? null,

    fiesta_titulo:         event.fiesta_titulo ?? null,
    fiesta_lugar:          event.fiesta_lugar ?? null,
    fiesta_direccion:      event.fiesta_direccion ?? null,
    fiesta_mapa_url:       event.fiesta_mapa_url ?? null,
    fiesta_hora:           fechaFiesta ? fmtHora(fechaFiesta) : null,
    fiesta_fecha_larga:    fechaFiesta ? fmtFecha(fechaFiesta) : null,

    dia,
    mes,
    anio,
    weekday,
    hora,
    fecha_larga:           fmtFecha(fechaCeremonia),

    deadline_passed:       deadlinePassed,
    rsvp_deadline_fecha_larga: new Date(event.rsvp_deadline).toLocaleDateString(
      'es-ES',
      { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' },
    ),
    quote: 'Y así, después de tantos caminos, elegimos uno solo: el nuestro.',
  }

  return (
    <MusicProvider>
      <Envelope>
        <BotanicalVersion data={data} />
      </Envelope>
    </MusicProvider>
  )
}
