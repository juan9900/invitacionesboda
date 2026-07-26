type Guest = {
  nombres: string
  telefono: string | null
  slug: string
  incluye_fiesta: boolean
}

type Templates = {
  ceremonia: string
  completo: string
}

export function buildWhatsAppLink(
  guest: Guest,
  templates: Templates,
  siteUrl: string,
): string | null {
  if (!guest.telefono) return null

  const tpl = guest.incluye_fiesta ? templates.completo : templates.ceremonia
  const url = `${siteUrl.replace(/\/$/, '')}/${guest.slug}`
  const mensaje = tpl
    .replace(/\{nombres\}/g, guest.nombres)
    .replace(/\{url\}/g, url)

  const phone = guest.telefono.replace(/[^\d]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`
}
