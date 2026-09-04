'use client'

import { useState, useTransition } from 'react'
import { setIdioma } from '@/app/actions/guests'

export function IdiomaSelect({
  id,
  defaultValue,
}: {
  id: string
  defaultValue: 'es' | 'en'
}) {
  const [idioma, setIdiomaState] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()

  return (
    <select
      value={idioma}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as 'es' | 'en'
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
      className="rounded border border-gray-300 bg-white px-2 py-1 text-sm"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  )
}
