-- De quién es invitado: del novio o de la novia.

create type public.guest_lado as enum ('novio', 'novia');

alter table public.guests add column lado public.guest_lado;

-- Backfill: los cargados el 24/08 son del novio, el resto de la novia.
update public.guests
set lado = case when created_at < '2026-08-25'::timestamptz then 'novio' else 'novia' end::public.guest_lado;

create index guests_lado_idx on public.guests (lado);

-- El guard de anon es una lista negra explícita de columnas: hay que sumar
-- "lado" para que no quede editable desde el RSVP público.
create or replace function public.guests_anon_update_guard()
returns trigger language plpgsql as $$
begin
  if auth.role() = 'anon' then
    if new.slug           is distinct from old.slug
    or new.nombres        is distinct from old.nombres
    or new.pases          is distinct from old.pases
    or new.telefono       is distinct from old.telefono
    or new.id             is distinct from old.id
    or new.created_at     is distinct from old.created_at
    or new.lado           is distinct from old.lado
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
