-- Idioma de la invitación por invitado: controla el copy fijo de la
-- tarjeta pública, el formato de fechas y la plantilla de WhatsApp que se
-- usa al enviar. No afecta los textos que vienen de la tabla `event`
-- (lugar, direcciones, títulos), que se muestran igual en ambos idiomas.

create type public.guest_idioma as enum ('es', 'en');

alter table public.guests
  add column idioma public.guest_idioma not null default 'es';

alter table public.event
  add column mensaje_whatsapp_tpl_individual_en text not null default
    'Hi {nombres}! 💌 We''re so happy to invite you to our wedding. Here''s your invitation with all the details: {url}',
  add column mensaje_whatsapp_tpl_pareja_en text not null default
    'Hi {nombres}! 💌 We''re so happy to invite you to our wedding. Here''s your invitation with all the details: {url}',
  add column mensaje_whatsapp_tpl_familia_en text not null default
    'Hi {nombres}! 💌 We''re so happy to invite you to our wedding. Here''s your invitation with all the details: {url}',
  add column mensaje_whatsapp_tpl_cortesia_en text not null default
    'Hi {nombres}! 💌 We know you won''t be able to join us in person, but we wanted you to be part of this day anyway. Here''s your invitation: {url}';

-- El guard de guests_anon_update_guard() es una lista negra de columnas
-- protegidas (ver nota en 0007), así que toda columna nueva debe agregarse
-- explícitamente o queda escribible por el rol anon. Se recrea la función
-- agregando "idioma" a esa lista, sin tocar el resto del comportamiento.
create or replace function public.guests_anon_update_guard()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if auth.role() = 'anon' then
    if new.slug           is distinct from old.slug
    or new.nombres        is distinct from old.nombres
    or new.pases          is distinct from old.pases
    or new.telefono       is distinct from old.telefono
    or new.id             is distinct from old.id
    or new.created_at     is distinct from old.created_at
    or new.lado           is distinct from old.lado
    or new.cortesia       is distinct from old.cortesia
    or new.idioma         is distinct from old.idioma
    then
      raise exception 'anon can only update RSVP columns';
    end if;

    if new.pases_confirmados is not null and new.pases_confirmados > old.pases then
      raise exception 'pases_confirmados exceeds pases';
    end if;

    if (select rsvp_deadline from public.event where id = 1) < now() then
      raise exception 'RSVP deadline passed';
    end if;
  end if;
  return new;
end$$;
