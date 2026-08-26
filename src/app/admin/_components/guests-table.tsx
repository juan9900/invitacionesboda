'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { EnviadoCheckbox } from '@/app/admin/_components/enviado-checkbox'
import { CopyMessageButton } from '@/app/admin/_components/copy-message-button'

export type GuestRow = {
  id: string
  slug: string
  nombres: string
  pases: number
  lado: 'novio' | 'novia' | null
  confirmado: boolean | null
  pases_confirmados: number | null
  confirmado_at: string | null
  enviado: boolean
  created_at: string
  waLink: string | null
  mensaje: string
  cortesia: boolean
}

type SortKey =
  | 'nombres'
  | 'pases'
  | 'lado'
  | 'confirmado'
  | 'enviado'
  | 'created_at'

type Sort = { key: SortKey; dir: 'asc' | 'desc' }

// Para estas columnas tiene más sentido empezar mostrando lo "más" primero.
const DEFAULT_DESC: SortKey[] = ['pases', 'confirmado', 'enviado', 'created_at']

const confirmadoRank = (v: boolean | null) =>
  v === true ? 2 : v === null ? 1 : 0

const ladoRank = (v: 'novio' | 'novia' | null) =>
  v === 'novio' ? 0 : v === 'novia' ? 1 : 2

function compare(a: GuestRow, b: GuestRow, key: SortKey): number {
  switch (key) {
    case 'nombres':
      return a.nombres.localeCompare(b.nombres, 'es')
    case 'pases':
      return (
        a.pases - b.pases ||
        (a.pases_confirmados ?? -1) - (b.pases_confirmados ?? -1)
      )
    case 'lado':
      return ladoRank(a.lado) - ladoRank(b.lado)
    case 'confirmado':
      return confirmadoRank(a.confirmado) - confirmadoRank(b.confirmado)
    case 'enviado':
      return Number(a.enviado) - Number(b.enviado)
    case 'created_at':
      return a.created_at.localeCompare(b.created_at)
  }
}

export function GuestsTable({ rows }: { rows: GuestRow[] }) {
  const [sort, setSort] = useState<Sort>({ key: 'created_at', dir: 'desc' })
  const [ocultarCortesia, setOcultarCortesia] = useState(false)

  const visibles = ocultarCortesia ? rows.filter((r) => !r.cortesia) : rows

  const sorted = useMemo(() => {
    const dirMul = sort.dir === 'asc' ? 1 : -1
    return [...visibles].sort((a, b) => {
      const primary = compare(a, b, sort.key)
      if (primary !== 0) return primary * dirMul
      return a.nombres.localeCompare(b.nombres, 'es')
    })
  }, [visibles, sort])

  function toggleSort(key: SortKey) {
    setSort((prev) => {
      if (prev.key !== key) {
        return { key, dir: DEFAULT_DESC.includes(key) ? 'desc' : 'asc' }
      }
      return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
    })
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="flex w-fit items-center gap-2 text-xs text-gray-600">
        <input
          type="checkbox"
          checked={ocultarCortesia}
          onChange={(e) => setOcultarCortesia(e.target.checked)}
        />
        Ocultar cortesía
      </label>
      <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <SortableHeader
              label="Nombres"
              sortKey="nombres"
              sort={sort}
              onSort={toggleSort}
            />
            <SortableHeader
              label="Pases"
              sortKey="pases"
              sort={sort}
              onSort={toggleSort}
            />
            <SortableHeader
              label="Lado"
              sortKey="lado"
              sort={sort}
              onSort={toggleSort}
            />
            <SortableHeader
              label="Estado"
              sortKey="confirmado"
              sort={sort}
              onSort={toggleSort}
            />
            <SortableHeader
              label="Enviado"
              sortKey="enviado"
              sort={sort}
              onSort={toggleSort}
            />
            <th className="px-3 py-2">Link</th>
            <th className="px-3 py-2">WhatsApp</th>
            <th className="px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((g) => (
            <tr key={g.id} className="border-t">
              <td className="px-3 py-2 font-medium">
                {g.nombres}
                {g.cortesia && (
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-normal uppercase tracking-wide text-gray-600">
                    Cortesía
                  </span>
                )}
              </td>
              <td className="px-3 py-2">
                {g.cortesia ? '—' : `${g.pases_confirmados ?? '—'} / ${g.pases}`}
              </td>
              <td className="px-3 py-2">
                <Lado v={g.lado} />
              </td>
              <td className="px-3 py-2">
                <Estado v={g.confirmado} />
              </td>
              <td className="px-3 py-2">
                <EnviadoCheckbox id={g.id} defaultChecked={g.enviado} />
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
                {g.waLink ? (
                  <a
                    href={g.waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-700 underline"
                  >
                    Enviar
                  </a>
                ) : (
                  <CopyMessageButton mensaje={g.mensaje} />
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
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
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

function SortableHeader({
  label,
  sortKey,
  sort,
  onSort,
}: {
  label: string
  sortKey: SortKey
  sort: Sort
  onSort: (key: SortKey) => void
}) {
  const active = sort.key === sortKey
  return (
    <th
      className="px-3 py-2"
      aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
    >
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        className="flex items-center gap-1 font-semibold hover:text-gray-900"
      >
        {label}
        <span className="text-gray-400">
          {active ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
        </span>
      </button>
    </th>
  )
}

function Lado({ v }: { v: 'novio' | 'novia' | null }) {
  if (v === 'novio') return <span className="text-blue-700">Novio</span>
  if (v === 'novia') return <span className="text-pink-700">Novia</span>
  return <span className="text-gray-400">—</span>
}

function Estado({ v }: { v: boolean | null }) {
  if (v === true)
    return <span className="text-green-700">✓ Confirmado</span>
  if (v === false)
    return <span className="text-red-700">✗ Rechazó</span>
  return <span className="text-amber-700">Pendiente</span>
}
