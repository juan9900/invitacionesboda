-- Elimina el concepto de "fiesta" (celebración/recepción): la invitación
-- solo referencia la ceremonia.

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

alter table public.guests drop column incluye_fiesta;

alter table public.event
  drop column fiesta_titulo,
  drop column fiesta_fecha,
  drop column fiesta_lugar,
  drop column fiesta_direccion,
  drop column fiesta_mapa_url,
  drop column mensaje_whatsapp_tpl_completo;
