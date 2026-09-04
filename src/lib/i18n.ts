// Copy fijo de la invitación pública, en español e inglés. Los datos que
// vienen de la tabla `event` (lugar, direcciones, títulos) NO viven acá:
// se muestran igual en ambos idiomas.

export type Lang = 'es' | 'en'

export const LOCALE: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
}

export const COPY = {
  es: {
    slide: 'Desliza',
    honor: (pases: number) =>
      `Tenemos el honor de invitar${pases === 1 ? 'te' : 'les'} a la celebración de nuestro matrimonio, con la bendición de Dios y de nuestros padres`,
    for: 'Para',
    pases: (n: number) => `${n} ${n === 1 ? 'pase' : 'pases'}`,

    dia: 'día',
    mes: 'mes',
    anio: 'año',
    faltan: 'Faltan',
    countdownDias: 'días',
    countdownHoras: 'horas',
    countdownMin: 'min',
    countdownSeg: 'seg',

    dressCode: 'Código de vestimenta',
    formal: 'Formal',
    nota: 'Nota',
    dressCodeNota: 'Prescindir de blanco en todos sus tonos.',

    ceremonia: 'Ceremonia',
    verEnElMapa: 'Ver en el mapa',
    recepcionFallback: 'Recepción',

    regalosTitulo: 'Tu presencia es nuestro mayor regalo',
    regalosIntro:
      'Si además quieres tener un detalle con nosotros, puedes hacerlo por Zelle o Pago Móvil:',
    zelle: 'Zelle',
    pagoMovil: 'Pago Móvil',
    correoOTelefono: 'Correo o teléfono',
    titular: 'Titular',
    referencia: 'Referencia',
    para: 'Para',
    de: 'De',
    deTuNombre: '[tu nombre]',
    banco: 'Banco',
    cedula: 'Cédula',
    telefono: 'Teléfono',
    regalosEfectivo:
      'Si prefieres aportar en efectivo, el día de la boda podrás hacerlo.',

    rsvpTituloCortesia: 'Nos harán falta',
    rsvpTitulo: '¿Nos acompañarás?',
    rsvpCortesiaTexto:
      'Sabemos que la distancia no te permite acompañarnos en persona, pero queríamos que fueras parte de este día igual.',
    rsvpDeadlinePassed: 'El plazo de confirmación ha terminado.',
    rsvpConfirmaAntes: 'Por favor confirma tu asistencia antes del',

    nosVemos: '¡Nos vemos!',

    heroAlt: 'Juan y Cynthia',
    besoAlt: 'Juan y Cynthia besándose',
    balconAlt: 'Juan y Cynthia riendo en el balcón',
    cierreAlt: 'Juan y Cynthia',

    abrirInvitacion: 'Toca para abrir tu invitación',
    abrirSobre: 'Abrir sobre',
    tocaParaAbrir: 'toca para abrir',
    silenciarMusica: 'Silenciar música',
    reproducirMusica: 'Reproducir música',

    rsvpGraciasAvisar: 'Gracias por avisarnos',
    rsvpModificar: 'Modificar respuesta',
    rsvpGracias: '¡Gracias!',
    rsvpGuardado: 'Tu respuesta se ha guardado.',
    rsvpSiPlural: 'Sí, asistiremos',
    rsvpSiSingular: 'Sí, asistiré',
    rsvpConGusto: 'Con mucho gusto',
    rsvpNoPlural: 'No podremos asistir',
    rsvpNoSingular: 'No podré ir',
    rsvpCorazonPlural: 'Estaremos de corazón',
    rsvpCorazonSingular: 'Estaré de corazón',
    rsvpCuantosPases: (max: number) =>
      `¿Cuántos pases serán usados? (máx ${max})`,
    rsvpGuardando: 'Guardando…',
    rsvpConfirmar: 'Confirmar asistencia',

    transmisionLosEsperamos: 'Los esperamos en línea',
    transmisionTeEsperamos: 'Te esperamos en línea',
    transmisionNosHaranFalta: 'Nos harán falta',
    transmisionParcial:
      'Sabemos que no todos podrán acompañarnos en persona, pero queremos que sean parte de este día igual.',
    transmisionCompleta:
      'Sabemos que no podrán acompañarnos en persona, pero queremos que sean parte de este día igual.',
    transmisionYoutube:
      'Transmitiremos la ceremonia en vivo por nuestro canal de YouTube.',
    transmisionSuscribirme: 'Suscribirme al canal',
    transmisionAviso:
      'Te enviaremos el enlace del directo unos días antes de la boda.',

    invitacionNoEncontrada: 'Invitación no encontrada',
    invitacionNoEncontradaTexto:
      'Revisa el enlace o ponte en contacto con los novios.',
  },
  en: {
    slide: 'Scroll',
    honor: () =>
      'We have the honor of inviting you to the celebration of our wedding, with the blessing of God and our parents',
    for: 'For',
    pases: (n: number) => `${n} ${n === 1 ? 'guest' : 'guests'}`,

    dia: 'day',
    mes: 'month',
    anio: 'year',
    faltan: 'Counting down',
    countdownDias: 'days',
    countdownHoras: 'hours',
    countdownMin: 'min',
    countdownSeg: 'sec',

    dressCode: 'Dress code',
    formal: 'Formal',
    nota: 'Note',
    dressCodeNota: 'Please avoid wearing white in any shade.',

    ceremonia: 'Ceremony',
    verEnElMapa: 'View on map',
    recepcionFallback: 'Reception',

    regalosTitulo: 'Your presence is our greatest gift',
    regalosIntro:
      "If you'd also like to send us something, you can do it via Zelle or Pago Móvil:",
    zelle: 'Zelle',
    pagoMovil: 'Pago Móvil',
    correoOTelefono: 'Email or phone',
    titular: 'Account holder',
    referencia: 'Reference',
    para: 'To',
    de: 'From',
    deTuNombre: '[your name]',
    banco: 'Bank',
    cedula: 'ID',
    telefono: 'Phone',
    regalosEfectivo:
      "If you'd rather give cash, you'll be able to on the wedding day.",

    rsvpTituloCortesia: "We'll miss you",
    rsvpTitulo: 'Will you join us?',
    rsvpCortesiaTexto:
      "We know the distance won't let you join us in person, but we wanted you to be part of this day anyway.",
    rsvpDeadlinePassed: 'The RSVP deadline has passed.',
    rsvpConfirmaAntes: 'Please confirm your attendance before',

    nosVemos: 'See you there!',

    heroAlt: 'Juan and Cynthia',
    besoAlt: 'Juan and Cynthia kissing',
    balconAlt: 'Juan and Cynthia laughing on the balcony',
    cierreAlt: 'Juan and Cynthia',

    abrirInvitacion: 'Tap to open your invitation',
    abrirSobre: 'Open envelope',
    tocaParaAbrir: 'tap to open',
    silenciarMusica: 'Mute music',
    reproducirMusica: 'Play music',

    rsvpGraciasAvisar: 'Thank you for letting us know',
    rsvpModificar: 'Change response',
    rsvpGracias: 'Thank you!',
    rsvpGuardado: 'Your response has been saved.',
    rsvpSiPlural: "Yes, we'll be there",
    rsvpSiSingular: "Yes, I'll be there",
    rsvpConGusto: 'Gladly',
    rsvpNoPlural: "We won't be able to attend",
    rsvpNoSingular: "I won't be able to attend",
    rsvpCorazonPlural: "We'll be there in spirit",
    rsvpCorazonSingular: "I'll be there in spirit",
    rsvpCuantosPases: (max: number) => `How many guests will attend? (max ${max})`,
    rsvpGuardando: 'Saving…',
    rsvpConfirmar: 'Confirm attendance',

    transmisionLosEsperamos: "We'll see you online",
    transmisionTeEsperamos: "We'll see you online",
    transmisionNosHaranFalta: "We'll miss you",
    transmisionParcial:
      "We know not everyone will be able to join us in person, but we want you to be part of this day anyway.",
    transmisionCompleta:
      "We know you won't be able to join us in person, but we want you to be part of this day anyway.",
    transmisionYoutube:
      "We'll be streaming the ceremony live on our YouTube channel.",
    transmisionSuscribirme: 'Subscribe to the channel',
    transmisionAviso:
      "We'll send you the live link a few days before the wedding.",

    invitacionNoEncontrada: 'Invitation not found',
    invitacionNoEncontradaTexto:
      'Please check the link or get in touch with the couple.',
  },
} satisfies Record<Lang, unknown>
