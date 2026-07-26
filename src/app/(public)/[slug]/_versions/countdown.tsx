'use client'

import { useEffect, useState } from 'react'

type Time = { days: number; hours: number; minutes: number; seconds: number }

function calc(iso: string): Time {
  const diff = Math.max(0, new Date(iso).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function Countdown({
  targetIso,
  variant = 'luxe',
}: {
  targetIso: string
  variant?: 'luxe' | 'editorial' | 'botanical' | 'primary'
}) {
  const [time, setTime] = useState<Time | null>(null)

  useEffect(() => {
    setTime(calc(targetIso))
    const id = setInterval(() => setTime(calc(targetIso)), 1000)
    return () => clearInterval(id)
  }, [targetIso])

  if (!time) {
    return <p className="opacity-30 text-[0.75rem] text-center tracking-[0.3em] uppercase">· · ·</p>
  }

  const units = [
    { value: time.days, label: 'días' },
    { value: time.hours, label: 'horas' },
    { value: time.minutes, label: 'min' },
    { value: time.seconds, label: 'seg' },
  ]

  /* ─── LUXE ─── */
  if (variant === 'luxe') {
    return (
      <div className="flex items-end justify-center gap-[6px] flex-wrap">
        {units.map(({ value, label }, i) => (
          <div key={label} className="flex items-end gap-[6px]">
            {i > 0 && (
              <span className="text-gold text-[1.1rem] leading-none mb-6 opacity-50 font-serif font-light">·</span>
            )}
            <div
              className="flex flex-col items-center rounded-[3px] min-w-[62px]"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(201,168,76,0.3)',
                borderTopWidth: 2,
                borderTopColor: 'var(--gold)',
                padding: '12px 18px 10px',
                boxShadow: '0 4px 20px rgba(156,122,46,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              <span className="block font-serif text-[2.4rem] font-light text-[#3d0e18] leading-none tracking-[-0.02em]">{pad(value)}</span>
              <span className="block text-[0.5rem] uppercase tracking-[0.22em] text-gold mt-[7px]">{label}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  /* ─── EDITORIAL ─── */
  if (variant === 'editorial') {
    return (
      <div className="flex items-baseline gap-2 flex-wrap">
        {units.map(({ value, label }, i) => (
          <span key={label} className="font-display font-bold text-[1.7rem] text-[#5b1a26] tracking-[-0.04em] leading-none">
            {i > 0 && (
              <span className="opacity-[0.35] font-light text-[1.2rem] mr-[4px]">/</span>
            )}
            {pad(value)}<span className="text-[0.65rem] font-normal tracking-[0.1em] opacity-70 ml-[2px]">{label}</span>
          </span>
        ))}
      </div>
    )
  }

  /* ─── BOTANICAL ─── */
  if (variant === 'botanical') {
    return (
      <div className="flex items-end justify-center gap-[8px] flex-wrap">
        {units.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-full min-w-[58px]"
            style={{
              background: 'rgba(255,255,255,0.75)',
              border: '1.5px solid var(--sage)',
              padding: '10px 16px 8px',
              boxShadow: '0 2px 10px rgba(107,124,94,0.1)',
            }}
          >
            <span className="block font-serif text-[2rem] font-light text-sage-deep leading-none">{pad(value)}</span>
            <span className="block text-[0.48rem] uppercase tracking-[0.22em] text-sage mt-[6px]">{label}</span>
          </div>
        ))}
      </div>
    )
  }

  /* ─── PRIMARY (dark/wine background) ─── */
  return (
    <div className="flex items-end justify-center gap-[8px] flex-wrap">
      {units.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col items-center rounded-full min-w-[58px]"
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1.5px solid rgba(255,255,255,0.28)',
            padding: '10px 16px 8px',
          }}
        >
          <span className="block font-serif text-[2rem] font-light text-white leading-none">{pad(value)}</span>
          <span className="block text-[0.48rem] uppercase tracking-[0.22em] text-white/60 mt-[6px]">{label}</span>
        </div>
      ))}
    </div>
  )
}
