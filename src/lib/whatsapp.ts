type Guest = {
  nombres: string
  telefono: string | null
  pases: number
  slug: string
}

export type WhatsAppTemplates = {
  mensaje_whatsapp_tpl_individual: string
  mensaje_whatsapp_tpl_pareja: string
  mensaje_whatsapp_tpl_familia: string
}

function pickTemplate(guest: Guest, templates: WhatsAppTemplates): string {
  if (guest.pases === 1) return templates.mensaje_whatsapp_tpl_individual
  if (guest.pases === 2) return templates.mensaje_whatsapp_tpl_pareja
  return templates.mensaje_whatsapp_tpl_familia
}

export function buildWhatsAppLink(
  guest: Guest,
  templates: WhatsAppTemplates,
  siteUrl: string,
): string | null {
  if (!guest.telefono) return null

  const url = `${siteUrl.replace(/\/$/, '')}/${guest.slug}`
  const mensaje = pickTemplate(guest, templates)
    .replace(/\{nombres\}/g, guest.nombres)
    .replace(/\{url\}/g, url)

  const phone = guest.telefono.replace(/[^\d]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
}
