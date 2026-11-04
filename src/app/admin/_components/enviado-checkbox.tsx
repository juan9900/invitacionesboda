'use client'

import { useState, useTransition } from 'react'
import { Spinner } from '@/app/admin/_components/spinner'
import { setEnviado } from '@/app/actions/guests'

export function EnviadoCheckbox({
  id,
  defaultChecked,
  action = setEnviado,
}: {
  id: string
  defaultChecked: boolean
  action?: (id: string, value: boolean) => Promise<void>
}) {
  const [checked, setChecked] = useState(defaultChecked)
  const [isPending, startTransition] = useTransition()

  return (
    <span className="inline-flex items-center gap-2">
    <input
      type="checkbox"
      checked={checked}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.checked
        setChecked(next)
        startTransition(async () => {
          try {
            await action(id, next)
          } catch {
            setChecked(!next)
          }
        })
      }}
      className="h-4 w-4 disabled:cursor-not-allowed disabled:opacity-60"
    />
    {isPending && <Spinner className="h-3.5 w-3.5 text-gray-500" />}
    </span>
  )
}
