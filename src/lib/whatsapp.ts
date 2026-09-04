import type { Lang } from '@/lib/i18n'

type Guest = {
  nombres: string
  telefono: string | null
  pases: number
  slug: string
  cortesia: boolean
  idioma: Lang
}

export type WhatsAppTemplates = {
  mensaje_whatsapp_tpl_individual: string
  mensaje_whatsapp_tpl_pareja: string
  mensaje_whatsapp_tpl_familia: string
  mensaje_whatsapp_tpl_cortesia: string
  mensaje_whatsapp_tpl_individual_en: string
  mensaje_whatsapp_tpl_pareja_en: string
  mensaje_whatsapp_tpl_familia_en: string
  mensaje_whatsapp_tpl_cortesia_en: string
}

function pickTemplate(guest: Omit<Guest, 'telefono'>, templates: WhatsAppTemplates): string {
  const kind = guest.cortesia
    ? 'cortesia'
    : guest.pases === 1
      ? 'individual'
      : guest.pases === 2
        ? 'pareja'
        : 'familia'
  const suffix = guest.idioma === 'en' ? '_en' : ''
  const key = `mensaje_whatsapp_tpl_${kind}${suffix}` as keyof WhatsAppTemplates
  return templates[key]
}

export function buildMessage(
  guest: Omit<Guest, 'telefono'>,
  templates: WhatsAppTemplates,
  siteUrl: string,
): string {
  const url = `${siteUrl.replace(/\/$/, '')}/${guest.slug}`
  return pickTemplate(guest, templates)
    .replace(/\{nombres\}/g, guest.nombres)
    .replace(/\{url\}/g, url)
}

export function buildWhatsAppLink(
  guest: Guest,
  templates: WhatsAppTemplates,
  siteUrl: string,
): string | null {
  if (!guest.telefono) return null

  const mensaje = buildMessage(guest, templates, siteUrl)
  const phone = guest.telefono.replace(/[^\d]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
}
