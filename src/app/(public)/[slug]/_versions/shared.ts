import type { Lang } from '@/lib/i18n'

export type InviteData = {
  slug: string
  nombres: string
  pases: number
  confirmado: boolean | null
  pases_confirmados: number | null
  cortesia: boolean
  lang: Lang

  ceremonia_lugar: string
  ceremonia_fecha_iso: string   // ISO string completo para el countdown
  ceremonia_direccion: string | null
  ceremonia_mapa_url: string | null

  fiesta_titulo: string | null
  fiesta_lugar: string | null
  fiesta_direccion: string | null
  fiesta_mapa_url: string | null
  fiesta_hora: string | null
  fiesta_fecha_larga: string | null

  dia: string        // "15"
  mes: string        // "OCTUBRE"
  anio: string       // "2026"
  weekday: string    // "sábado"
  hora: string       // "11:00"
  fecha_larga: string // "sábado, 15 de octubre de 2026"

  cierre_weekday: string // "sábado" / "Saturday" — para la sección de cierre
  cierre_fecha: string   // "15 de octubre de 2026" / "October 15, 2026"

  deadline_passed: boolean
  rsvp_deadline_fecha_larga: string // "31 de octubre de 2026"
}
