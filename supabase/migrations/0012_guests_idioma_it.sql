-- Agrega italiano como tercer idioma disponible para la invitación, junto a
-- español e inglés (ver 0010). Se agrega el valor al enum y las plantillas
-- de WhatsApp en italiano, con el mismo texto que 0011 tradujo al inglés.

alter type public.guest_idioma add value 'it';

alter table public.event
  add column mensaje_whatsapp_tpl_individual_it text not null default
    'Ciao {nombres}! 💌 Siamo felicissimi di invitarti al nostro matrimonio. Qui trovi il tuo invito con tutti i dettagli: {url}',
  add column mensaje_whatsapp_tpl_pareja_it text not null default
    'Ciao {nombres}! 💌 Siamo felicissimi di invitarti al nostro matrimonio. Qui trovi il tuo invito con tutti i dettagli: {url}',
  add column mensaje_whatsapp_tpl_familia_it text not null default
    'Ciao {nombres}! 💌 Siamo felicissimi di invitarti al nostro matrimonio. Qui trovi il tuo invito con tutti i dettagli: {url}',
  add column mensaje_whatsapp_tpl_cortesia_it text not null default
    'Ciao {nombres}! 💌 Sappiamo che non potrai accompagnarci di persona, ma volevamo che facessi comunque parte di questo giorno. Ecco il tuo invito: {url}';
