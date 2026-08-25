-- Reemplaza la plantilla única de WhatsApp por tres plantillas automáticas
-- según el tipo de invitado (individual, pareja o familia), calculado a
-- partir de "pases". Así el mensaje sale más personalizado sin trabajo manual.

alter table public.event
  add column mensaje_whatsapp_tpl_individual text not null default
    '¡Hola {nombres}! 💌 Con mucha alegría queremos invitarte a nuestra boda. Aquí tienes tu invitación con todos los detalles: {url}',
  add column mensaje_whatsapp_tpl_pareja text not null default
    '¡Hola {nombres}! 💌 Nos encantaría contar con ustedes en nuestra boda. Aquí tienen su invitación con todos los detalles: {url}',
  add column mensaje_whatsapp_tpl_familia text not null default
    '¡Hola {nombres}! 💌 Queremos invitar a toda la familia a celebrar nuestra boda con nosotros. Aquí tienen su invitación con todos los detalles: {url}';

update public.event
set
  mensaje_whatsapp_tpl_individual = mensaje_whatsapp_tpl_ceremonia,
  mensaje_whatsapp_tpl_pareja = mensaje_whatsapp_tpl_ceremonia,
  mensaje_whatsapp_tpl_familia = mensaje_whatsapp_tpl_ceremonia
where mensaje_whatsapp_tpl_ceremonia is not null;

alter table public.event drop column mensaje_whatsapp_tpl_ceremonia;
