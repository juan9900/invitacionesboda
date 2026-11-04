'use client'

import { useFormStatus } from 'react-dom'
import { Spinner } from '@/app/admin/_components/spinner'

export function SubmitButton({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending && <Spinner />}
      {children}
    </button>
  )
}
