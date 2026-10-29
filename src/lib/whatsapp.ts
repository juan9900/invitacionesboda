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
  mensaje_whatsapp_tpl_individual_it: string
  mensaje_whatsapp_tpl_pareja_it: string
  mensaje_whatsapp_tpl_familia_it: string
  mensaje_whatsapp_tpl_cortesia_it: string
}

function pickTemplate(guest: Omit<Guest, 'telefono'>, templates: WhatsAppTemplates): string {
  const kind = guest.cortesia
    ? 'cortesia'
    : guest.pases === 1
      ? 'individual'
      : guest.pases === 2
        ? 'pareja'
        : 'familia'
  const suffix = guest.idioma === 'es' ? '' : `_${guest.idioma}`
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

// Aviso de cambio de fecha de la boda (cirugía de rodilla del novio). Es un
// texto fijo por idioma, no vive en la tabla `event`.
const AVISO_CAMBIO_FECHA: Record<Lang, string> = {
  es: `Hola {nombres}

Queremos contarte que Juan Luis tuvo un accidente en el que se lastimó la rodilla y la próxima semana deberá someterse a una cirugía. Por los plazos de recuperación, nos vimos en la necesidad de mover la fecha de la boda al *sábado 23 de enero de 2027*.

Lamentamos mucho este cambio y los inconvenientes que pueda causar. Por favor, confírmanos por este medio si podrás acompañarnos en la nueva fecha.

Aquí puedes ver tu invitación con la fecha actualizada:
{url}

¡Gracias por tu comprensión y cariño!`,
  en: `Hi {nombres}

We wanted to let you know that Juan Luis had an accident in which he hurt his knee, and next week he will need to have surgery. Because of the recovery time, we had to move the wedding date to *Saturday, January 23, 2027*.

We are very sorry for this change and for any inconvenience it may cause. Please confirm with us here whether you will be able to join us on the new date.

You can see your invitation with the updated date here:
{url}

Thank you for your understanding and affection!`,
  it: `Ciao {nombres}

Vogliamo informarti che Juan Luis ha avuto un incidente in cui si è fatto male al ginocchio e la prossima settimana dovrà sottoporsi a un intervento chirurgico. A causa dei tempi di recupero, siamo stati costretti a spostare la data del matrimonio a *sabato 23 gennaio 2027*.

Ci dispiace molto per questo cambiamento e per gli eventuali disagi. Ti preghiamo di confermarci qui se potrai essere con noi nella nuova data.

Qui puoi vedere il tuo invito con la data aggiornata:
{url}

Grazie per la comprensione e l'affetto!`,
}

// Versión para invitados con 2 pases o más (se les habla en plural). En inglés
// el texto es el mismo porque "you" ya sirve para singular y plural.
const AVISO_CAMBIO_FECHA_PLURAL: Record<Lang, string> = {
  es: `Hola {nombres}

Queremos contarles que Juan Luis tuvo un accidente en el que se lastimó la rodilla y la próxima semana deberá someterse a una cirugía. Por los plazos de recuperación, nos vimos en la necesidad de mover la fecha de la boda al *sábado 23 de enero de 2027*.

Lamentamos mucho este cambio y los inconvenientes que pueda causarles. Por favor, confírmennos por este medio si podrán acompañarnos en la nueva fecha.

Aquí pueden ver su invitación con la fecha actualizada:
{url}

¡Gracias por su comprensión y cariño!`,
  en: AVISO_CAMBIO_FECHA.en,
  it: `Ciao {nombres}

Vogliamo informarvi che Juan Luis ha avuto un incidente in cui si è fatto male al ginocchio e la prossima settimana dovrà sottoporsi a un intervento chirurgico. A causa dei tempi di recupero, siamo stati costretti a spostare la data del matrimonio a *sabato 23 gennaio 2027*.

Ci dispiace molto per questo cambiamento e per gli eventuali disagi. Vi preghiamo di confermarci qui se potrete essere con noi nella nuova data.

Qui potete vedere il vostro invito con la data aggiornata:
{url}

Grazie per la comprensione e l'affetto!`,
}

export function buildAvisoFechaMessage(
  guest: Pick<Guest, 'nombres' | 'slug' | 'idioma'> & { pases: number },
  siteUrl: string,
): string {
  const url = `${siteUrl.replace(/\/$/, '')}/${guest.slug}`
  const plantilla = guest.pases >= 2 ? AVISO_CAMBIO_FECHA_PLURAL : AVISO_CAMBIO_FECHA
  return plantilla[guest.idioma]
    .replace(/\{nombres\}/g, guest.nombres)
    .replace(/\{url\}/g, url)
}

export function buildAvisoFechaLink(
  guest: Pick<Guest, 'nombres' | 'slug' | 'idioma' | 'telefono' | 'pases'>,
  siteUrl: string,
): string | null {
  if (!guest.telefono) return null
  const phone = guest.telefono.replace(/[^\d]/g, '')
  return `https://wa.me/${phone}?text=${encodeURIComponent(buildAvisoFechaMessage(guest, siteUrl))}`
}
