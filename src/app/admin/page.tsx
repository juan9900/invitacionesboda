import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { getEvent } from '@/lib/event'
import { buildWhatsAppLink } from '@/lib/whatsapp'

type GuestRow = {
  id: string
  slug: string
  nombres: string
  pases: number
  telefono: string | null
  incluye_fiesta: boolean
  confirmado: boolean | null
  pases_confirmados: number | null
  confirmado_at: string | null
}

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const supabase = createAdminClient()
  const [{ data: guests }, event] = await Promise.all([
    supabase
      .from('guests')
      .select(
        'id, slug, nombres, pases, telefono, incluye_fiesta, confirmado, pases_confirmados, confirmado_at',
      )
      .order('created_at', { ascending: false }),
    getEvent(),
  ])

  const rows = (guests ?? []) as GuestRow[]

  const totalInvitados = rows.length
  const totalPases = rows.reduce((s, r) => s + r.pases, 0)
  const confirmadosSi = rows.filter((r) => r.confirmado === true)
  const confirmadosNo = rows.filter((r) => r.confirmado === false).length
  const pendientes = rows.filter((r) => r.confirmado === null).length
  const pasesConfirmados = confirmadosSi.reduce(
    (s, r) => s + (r.pases_confirmados ?? 0),
    0,
  )

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Invitados" value={totalInvitados} />
        <Stat label="Pases totales" value={totalPases} />
        <Stat label="Confirmados" value={confirmadosSi.length} tone="green" />
        <Stat label="Rechazados" value={confirmadosNo} tone="red" />
        <Stat label="Pendientes" value={pendientes} tone="amber" />
      </section>

      <p className="text-sm text-gray-700">
        Pases confirmados: <strong>{pasesConfirmados}</strong> /{' '}
        {totalPases}
      </p>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-3 py-2">Nombres</th>
              <th className="px-3 py-2">Pases</th>
              <th className="px-3 py-2">Versión</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Link</th>
              <th className="px-3 py-2">WhatsApp</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((g) => {
              const wa = buildWhatsAppLink(
                g,
                {
                  ceremonia: event.mensaje_whatsapp_tpl_ceremonia,
                  completo: event.mensaje_whatsapp_tpl_completo,
                },
                siteUrl,
              )
              return (
                <tr key={g.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{g.nombres}</td>
                  <td className="px-3 py-2">
                    {g.pases_confirmados ?? '—'} / {g.pases}
                  </td>
                  <td className="px-3 py-2">
                    {g.incluye_fiesta ? 'Iglesia + fiesta' : 'Solo iglesia'}
                  </td>
                  <td className="px-3 py-2">
                    <Estado v={g.confirmado} />
                  </td>
                  <td className="px-3 py-2">
                    <a
                      href={`/${g.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 underline"
                    >
                      /{g.slug}
                    </a>
                  </td>
                  <td className="px-3 py-2">
                    {wa ? (
                      <a
                        href={wa}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-700 underline"
                      >
                        Enviar
                      </a>
                    ) : (
                      <span className="text-gray-400">sin tel.</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/${g.id}`}
                      className="text-gray-700 underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              )
            })}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-8 text-center text-gray-500"
                >
                  Aún no hay invitados.{' '}
                  <Link href="/admin/nuevo" className="underline">
                    Crear el primero
                  </Link>
                  .
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
  tone?: 'green' | 'red' | 'amber'
}) {
  const toneCls =
    tone === 'green'
      ? 'text-green-700'
      : tone === 'red'
        ? 'text-red-700'
        : tone === 'amber'
          ? 'text-amber-700'
          : 'text-gray-900'
  return (
    <div className="rounded-lg border bg-white p-3">
      <p className="text-xs uppercase text-gray-500">{label}</p>
      <p className={`text-2xl font-semibold ${toneCls}`}>{value}</p>
    </div>
  )
}

function Estado({ v }: { v: boolean | null }) {
  if (v === true)
    return <span className="text-green-700">✓ Confirmado</span>
  if (v === false)
    return <span className="text-red-700">✗ Rechazó</span>
  return <span className="text-amber-700">Pendiente</span>
}
