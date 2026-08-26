import { createAdminClient } from '@/lib/supabase/admin'
import { getEvent } from '@/lib/event'
import { buildMessage, buildWhatsAppLink } from '@/lib/whatsapp'
import { GuestsTable, type GuestRow } from '@/app/admin/_components/guests-table'

type GuestFromDb = Omit<GuestRow, 'waLink'> & { telefono: string | null }

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const supabase = createAdminClient()
  const [{ data: guests }, event] = await Promise.all([
    supabase
      .from('guests')
      .select(
        'id, slug, nombres, pases, telefono, lado, confirmado, pases_confirmados, confirmado_at, enviado, created_at, cortesia',
      )
      .order('created_at', { ascending: false }),
    getEvent(),
  ])

  const guestRows = (guests ?? []) as GuestFromDb[]

  const templates = {
    mensaje_whatsapp_tpl_individual: event.mensaje_whatsapp_tpl_individual,
    mensaje_whatsapp_tpl_pareja: event.mensaje_whatsapp_tpl_pareja,
    mensaje_whatsapp_tpl_familia: event.mensaje_whatsapp_tpl_familia,
    mensaje_whatsapp_tpl_cortesia: event.mensaje_whatsapp_tpl_cortesia,
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const rows: GuestRow[] = guestRows.map(({ telefono, ...g }) => ({
    ...g,
    waLink: buildWhatsAppLink(
      { nombres: g.nombres, telefono, pases: g.pases, slug: g.slug, cortesia: g.cortesia },
      templates,
      siteUrl,
    ),
    mensaje: buildMessage(
      { nombres: g.nombres, pases: g.pases, slug: g.slug, cortesia: g.cortesia },
      templates,
      siteUrl,
    ),
  }))

  // Los invitados de cortesía no confirman asistencia y no deben mezclarse
  // con los totales de pases del evento.
  const cortesia = rows.filter((r) => r.cortesia)
  const activos = rows.filter((r) => !r.cortesia)

  const totalInvitados = activos.length
  const totalPases = activos.reduce((s, r) => s + r.pases, 0)
  const confirmadosSi = activos.filter((r) => r.confirmado === true)
  const confirmadosNo = activos.filter((r) => r.confirmado === false).length
  const pendientes = activos.filter((r) => r.confirmado === null).length
  const enviados = activos.filter((r) => r.enviado).length
  const pasesConfirmados = confirmadosSi.reduce(
    (s, r) => s + (r.pases_confirmados ?? 0),
    0,
  )

  const novios = activos.filter((r) => r.lado === 'novio')
  const novias = activos.filter((r) => r.lado === 'novia')
  const pasesNovio = novios.reduce((s, r) => s + r.pases, 0)
  const pasesNovia = novias.reduce((s, r) => s + r.pases, 0)
  const pasesConfirmadosNovio = confirmadosSi
    .filter((r) => r.lado === 'novio')
    .reduce((s, r) => s + (r.pases_confirmados ?? 0), 0)
  const pasesConfirmadosNovia = confirmadosSi
    .filter((r) => r.lado === 'novia')
    .reduce((s, r) => s + (r.pases_confirmados ?? 0), 0)

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Invitados" value={totalInvitados} />
        <Stat label="Pases totales" value={totalPases} />
        <Stat label="Confirmados" value={confirmadosSi.length} tone="green" />
        <Stat label="Rechazados" value={confirmadosNo} tone="red" />
        <Stat label="Pendientes" value={pendientes} tone="amber" />
        <Stat label="Enviados" value={enviados} />
        <Stat label="Del novio" value={novios.length} tone="blue" />
        <Stat label="De la novia" value={novias.length} tone="pink" />
        <Stat label="Cortesía" value={cortesia.length} />
      </section>

      <p className="text-sm text-gray-700">
        Pases confirmados: <strong>{pasesConfirmados}</strong> /{' '}
        {totalPases} total general · Del novio:{' '}
        <strong>{pasesConfirmadosNovio}</strong> / {pasesNovio} · De la
        novia: <strong>{pasesConfirmadosNovia}</strong> / {pasesNovia}
      </p>

      <GuestsTable rows={rows} />
    </div>
  )
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string
  value: number
  tone?: 'green' | 'red' | 'amber' | 'blue' | 'pink'
}) {
  const toneCls =
    tone === 'green'
      ? 'text-green-700'
      : tone === 'red'
        ? 'text-red-700'
        : tone === 'amber'
          ? 'text-amber-700'
          : tone === 'blue'
            ? 'text-blue-700'
            : tone === 'pink'
              ? 'text-pink-700'
              : 'text-gray-900'
  return (
    <div className="rounded-lg border bg-white p-3">
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold ${toneCls}`}>{value}</p>
    </div>
  )
}
