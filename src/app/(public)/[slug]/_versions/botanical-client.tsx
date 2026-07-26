'use client'

import dynamic from 'next/dynamic'
import type { InviteData } from './shared'

const BotanicalVersion = dynamic(() => import('./botanical'), { ssr: false })

export default function BotanicalClient({ data }: { data: InviteData }) {
  return <BotanicalVersion data={data} />
}
