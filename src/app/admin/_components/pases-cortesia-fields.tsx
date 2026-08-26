'use client'

import { useState } from 'react'

// Campo "Pases" + checkbox "Cortesía", combinados porque un invitado de
// cortesía siempre tiene 1 pase fijo: al marcar la casilla se oculta el
// campo de pases para que no se pueda editar por error.
export function PasesCortesiaFields({
  defaultPases,
  defaultCortesia,
  labelClassName = 'flex flex-col gap-1 text-sm font-medium text-gray-700',
  inputClassName = 'rounded border border-gray-300 bg-white px-3 py-2 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20',
}: {
  defaultPases: number
  defaultCortesia: boolean
  labelClassName?: string
  inputClassName?: string
}) {
  const [cortesia, setCortesia] = useState(defaultCortesia)

  return (
    <>
      {!cortesia && (
        <label className={labelClassName}>
          <span>Pases</span>
          <input
            name="pases"
            type="number"
            min={1}
            defaultValue={defaultPases}
            required
            className={inputClassName}
          />
        </label>
      )}
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <input
          type="checkbox"
          name="cortesia"
          checked={cortesia}
          onChange={(e) => setCortesia(e.target.checked)}
        />
        Cortesía (no asiste, no cuenta pases)
      </label>
    </>
  )
}
