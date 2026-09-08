// Copy fijo de la invitación pública, en español e inglés. Los datos que
// vienen de la tabla `event` (lugar, direcciones, títulos) NO viven acá:
// se muestran igual en ambos idiomas.

export type Lang = 'es' | 'en' | 'it'

export const LOCALE: Record<Lang, string> = {
  es: 'es-ES',
  en: 'en-US',
  it: 'it-IT',
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
  it: {
    slide: 'Scorri',
    honor: (pases: number) =>
      `Abbiamo l'onore di invitar${pases === 1 ? 'ti' : 'vi'} alla celebrazione del nostro matrimonio, con la benedizione di Dio e dei nostri genitori`,
    for: 'Per',
    pases: (n: number) => `${n} ${n === 1 ? 'invitato' : 'invitati'}`,

    dia: 'giorno',
    mes: 'mese',
    anio: 'anno',
    faltan: 'Mancano',
    countdownDias: 'giorni',
    countdownHoras: 'ore',
    countdownMin: 'min',
    countdownSeg: 'sec',

    dressCode: 'Codice di abbigliamento',
    formal: 'Formale',
    nota: 'Nota',
    dressCodeNota: 'Evitare il bianco in tutte le sue tonalità.',

    ceremonia: 'Cerimonia',
    verEnElMapa: 'Vedi sulla mappa',
    recepcionFallback: 'Ricevimento',

    regalosTitulo: 'La vostra presenza è il nostro regalo più grande',
    regalosIntro:
      'Se desiderate comunque farci un pensiero, potete farlo tramite Zelle o Pago Móvil:',
    zelle: 'Zelle',
    pagoMovil: 'Pago Móvil',
    correoOTelefono: 'Email o telefono',
    titular: 'Intestatario',
    referencia: 'Riferimento',
    para: 'A',
    de: 'Da',
    deTuNombre: '[il tuo nome]',
    banco: 'Banca',
    cedula: 'Documento',
    telefono: 'Telefono',
    regalosEfectivo:
      'Se preferite contribuire in contanti, potrete farlo il giorno del matrimonio.',

    rsvpTituloCortesia: 'Ci mancherete',
    rsvpTitulo: 'Sarete con noi?',
    rsvpCortesiaTexto:
      'Sappiamo che la distanza non vi permette di accompagnarci di persona, ma volevamo che faceste comunque parte di questo giorno.',
    rsvpDeadlinePassed: 'Il termine per confermare è scaduto.',
    rsvpConfirmaAntes: 'Vi preghiamo di confermare la vostra presenza entro il',

    nosVemos: 'Ci vediamo!',

    heroAlt: 'Juan e Cynthia',
    besoAlt: 'Juan e Cynthia che si baciano',
    balconAlt: 'Juan e Cynthia che ridono sul balcone',
    cierreAlt: 'Juan e Cynthia',

    abrirInvitacion: 'Tocca per aprire il tuo invito',
    abrirSobre: 'Apri la busta',
    tocaParaAbrir: 'tocca per aprire',
    silenciarMusica: 'Disattiva musica',
    reproducirMusica: 'Riproduci musica',

    rsvpGraciasAvisar: 'Grazie per averci avvisato',
    rsvpModificar: 'Modifica risposta',
    rsvpGracias: 'Grazie!',
    rsvpGuardado: 'La tua risposta è stata salvata.',
    rsvpSiPlural: 'Sì, ci saremo',
    rsvpSiSingular: 'Sì, ci sarò',
    rsvpConGusto: 'Con piacere',
    rsvpNoPlural: 'Non potremo esserci',
    rsvpNoSingular: 'Non potrò esserci',
    rsvpCorazonPlural: 'Saremo con voi col cuore',
    rsvpCorazonSingular: 'Sarò con voi col cuore',
    rsvpCuantosPases: (max: number) =>
      `Quanti invitati parteciperanno? (max ${max})`,
    rsvpGuardando: 'Salvataggio…',
    rsvpConfirmar: 'Conferma presenza',

    transmisionLosEsperamos: 'Vi aspettiamo online',
    transmisionTeEsperamos: 'Ti aspettiamo online',
    transmisionNosHaranFalta: 'Ci mancherete',
    transmisionParcial:
      'Sappiamo che non tutti potranno accompagnarci di persona, ma vogliamo che facciate comunque parte di questo giorno.',
    transmisionCompleta:
      'Sappiamo che non potrete accompagnarci di persona, ma vogliamo che facciate comunque parte di questo giorno.',
    transmisionYoutube:
      'Trasmetteremo la cerimonia in diretta sul nostro canale YouTube.',
    transmisionSuscribirme: 'Iscriviti al canale',
    transmisionAviso:
      'Vi invieremo il link della diretta qualche giorno prima del matrimonio.',

    invitacionNoEncontrada: 'Invito non trovato',
    invitacionNoEncontradaTexto:
      'Controlla il link o contatta gli sposi.',
  },
} satisfies Record<Lang, unknown>
