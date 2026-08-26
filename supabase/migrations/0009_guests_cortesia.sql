-- Invitados de "cortesía": familiares que reciben la invitación como gesto
-- pero de antemano se sabe que no podrán asistir. Ven la invitación completa
-- sin formulario RSVP ni conteo de pases, y quedan fuera de los totales del
-- admin.

alter table public.guests
  add column cortesia boolean not null default false;

alter table public.event
  add column mensaje_whatsapp_tpl_cortesia text not null default
    '¡Hola {nombres}! 💌 Sabemos que la distancia no te permitirá acompañarnos, pero queríamos que fueras parte de este día igual. Aquí tienes tu invitación: {url}';

-- El guard de guests_anon_update_guard() es una lista negra de columnas
-- protegidas (ver nota en 0007), así que toda columna nueva debe agregarse
-- explícitamente o queda escribible por el rol anon. Se recrea la función
-- agregando "cortesia" a esa lista, sin tocar el resto del comportamiento.
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
