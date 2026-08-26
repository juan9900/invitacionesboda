type Guest = {
  nombres: string
  telefono: string | null
  pases: number
  slug: string
  cortesia: boolean
}

export type WhatsAppTemplates = {
  mensaje_whatsapp_tpl_individual: string
  mensaje_whatsapp_tpl_pareja: string
  mensaje_whatsapp_tpl_familia: string
  mensaje_whatsapp_tpl_cortesia: string
}

function pickTemplate(guest: Omit<Guest, 'telefono'>, templates: WhatsAppTemplates): string {
  if (guest.cortesia) return templates.mensaje_whatsapp_tpl_cortesia
  if (guest.pases === 1) return templates.mensaje_whatsapp_tpl_individual
  if (guest.pases === 2) return templates.mensaje_whatsapp_tpl_pareja
  return templates.mensaje_whatsapp_tpl_familia
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
