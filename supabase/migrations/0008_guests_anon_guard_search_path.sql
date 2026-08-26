-- 0007 recreó guests_anon_update_guard() para incluir "lado" en el guard y
-- de paso revirtió el hardening de search_path aplicado antes (evita que un
-- search_path mutable permita hijacking de la función). Se vuelve a fijar.

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
