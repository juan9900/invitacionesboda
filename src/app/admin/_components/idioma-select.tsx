'use client'

import { useState, useTransition } from 'react'
import { Spinner } from '@/app/admin/_components/spinner'
import { setIdioma } from '@/app/actions/guests'

export function IdiomaSelect({
  id,
  defaultValue,
}: {
  id: string
  defaultValue: 'es' | 'en' | 'it'
}) {
  const [idioma, setIdiomaState] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()

  return (
    <span className="inline-flex items-center gap-2">
    <select
      value={idioma}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as 'es' | 'en' | 'it'
        const prev = idioma
        setIdiomaState(next)
        startTransition(async () => {
          try {
            await setIdioma(id, next)
          } catch {
            setIdiomaState(prev)
          }
        })
      }}
      className="rounded border border-gray-300 bg-white px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-60"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
      <option value="it">IT</option>
    </select>
    {isPending && <Spinner className="h-3.5 w-3.5 text-gray-500" />}
    </span>
  )
}
