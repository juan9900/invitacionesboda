-- Marca si la invitación ya fue enviada al invitado (checkbox manual en admin).

alter table public.guests
  add column enviado boolean not null default false;
