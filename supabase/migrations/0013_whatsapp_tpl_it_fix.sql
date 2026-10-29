-- La migración 0012 dejó las plantillas de WhatsApp en italiano (individual,
-- pareja, familia) con el texto genérico corto, mientras que español e
-- inglés usan el mensaje largo y personalizado (ver 0011). Se actualiza el
-- italiano para que sea la traducción de ese mismo mensaje.
-- mensaje_whatsapp_tpl_cortesia_it ya es una traducción correcta del texto
-- corto de cortesía (igual que su equivalente en español e inglés) y no se
-- toca.

update public.event
set
  mensaje_whatsapp_tpl_individual_it =
    E'{nombres}\r\n\r\nCi sono giorni nella vita che diventano indimenticabili quando vissuti con le persone giuste. Per questo siamo pieni di gioia nell''invitarti a far parte di un giorno così speciale per noi.\r\n\r\nGuidati dalla benedizione di Dio e con il cuore colmo di emozione, uniremo per sempre le nostre vite. Vogliamo averti al nostro fianco all''inizio di questo nuovo capitolo.\r\n\r\nTroverai tutti i dettagli del nostro matrimonio nel link qui sotto. Ti chiediamo gentilmente di confermare la tua presenza tramite quel link o rispondendo a questo messaggio il prima possibile.\r\n\r\n{url}',
  mensaje_whatsapp_tpl_pareja_it =
    E'{nombres}\r\n\r\nCi sono giorni nella vita che diventano indimenticabili quando vissuti con le persone giuste. Per questo siamo pieni di gioia nell''invitarti a far parte di un giorno così speciale per noi.\r\n\r\nGuidati dalla benedizione di Dio e con il cuore colmo di emozione, uniremo per sempre le nostre vite. Vogliamo averti al nostro fianco all''inizio di questo nuovo capitolo.\r\n\r\nTroverai tutti i dettagli del nostro matrimonio nel link qui sotto. Ti chiediamo gentilmente di confermare la tua presenza tramite quel link o rispondendo a questo messaggio il prima possibile.\r\n\r\n{url}',
  mensaje_whatsapp_tpl_familia_it =
    E'{nombres}\r\n\r\nCi sono giorni nella vita che diventano indimenticabili quando vissuti con le persone giuste. Per questo siamo pieni di gioia nell''invitarti a far parte di un giorno così speciale per noi.\r\n\r\nGuidati dalla benedizione di Dio e con il cuore colmo di emozione, uniremo per sempre le nostre vite. Vogliamo averti al nostro fianco all''inizio di questo nuovo capitolo.\r\n\r\nTroverai tutti i dettagli del nostro matrimonio nel link qui sotto. Ti chiediamo gentilmente di confermare la tua presenza tramite quel link o rispondendo a questo messaggio il prima possibile.\r\n\r\n{url}';
