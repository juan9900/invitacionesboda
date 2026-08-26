'use client'

import { useState } from 'react'

export function CopyMessageButton({ mensaje }: { mensaje: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(mensaje)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // noop
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="text-blue-700 underline"
    >
      {copied ? '¡Copiado!' : 'Copiar texto'}
    </button>
  )
}
