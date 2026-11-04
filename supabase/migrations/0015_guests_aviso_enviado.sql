-- Marca si al invitado ya se le envió el aviso de cambio de fecha de la boda.
-- Los invitados de la novia ya lo recibieron.

alter table public.guests
  add column aviso_enviado boolean not null default false;

update public.guests set aviso_enviado = true where lado = 'novia';
