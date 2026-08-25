export type InviteData = {
  slug: string
  nombres: string
  pases: number
  confirmado: boolean | null
  pases_confirmados: number | null

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

  deadline_passed: boolean
  quote: string
}
