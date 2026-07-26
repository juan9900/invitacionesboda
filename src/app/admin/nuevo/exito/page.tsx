import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import CopyButton from './copy-button'

export const dynamic = 'force-dynamic'

export default async function ExitoPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>
}) {
  const { slug } = await searchParams
  if (!slug) notFound()

  const supabase = createAdminClient()
  const { data: guest } = await supabase
    .from('guests')
    .select('nombres, pases, incluye_fiesta')
    .eq('slug', slug)
    .maybeSingle<{ nombres: string; pases: number; incluye_fiesta: boolean }>()

  if (!guest) notFound()

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const url = `${siteUrl}/${slug}`

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-green-800">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-sm text-white">
            ✓
          </span>
          <h1 className="text-xl font-semibold">Invitación creada</h1>
        </div>
        <p className="text-sm text-green-900">
          <strong>{guest.nombres}</strong> · {guest.pases}{' '}
          {guest.pases === 1 ? 'pase' : 'pases'} ·{' '}
          {guest.incluye_fiesta ? 'Iglesia + fiesta' : 'Solo iglesia'}
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Link de la invitación
        </label>
        <div className="flex gap-2">
          <input
            readOnly
            value={url}
            className="flex-1 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900"
          />
          <CopyButton value={url} />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noreferrer"
            className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-black"
          >
            Abrir invitación →
          </a>
          <Link
            href="/admin/nuevo"
            className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            Crear otra
          </Link>
          <Link
            href="/admin"
            className="rounded px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Volver al panel
          </Link>
        </div>
      </div>
    </div>
  )
}
