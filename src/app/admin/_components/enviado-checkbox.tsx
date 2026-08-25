'use client'

import { useState, useTransition } from 'react'
import { setEnviado } from '@/app/actions/guests'

export function EnviadoCheckbox({
  id,
  defaultChecked,
}: {
  id: string
  defaultChecked: boolean
}) {
  const [checked, setChecked] = useState(defaultChecked)
  const [isPending, startTransition] = useTransition()

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.checked
        setChecked(next)
        startTransition(async () => {
          try {
            await setEnviado(id, next)
          } catch {
            setChecked(!next)
          }
        })
      }}
      className="h-4 w-4"
    />
  )
}
