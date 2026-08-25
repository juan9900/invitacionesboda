-- Vuelve a agregar la información de la fiesta/recepción, esta vez visible
-- para todos los invitados (sin distinción por invitado).

alter table public.event
  add column fiesta_titulo    text,
  add column fiesta_fecha     timestamptz,
  add column fiesta_lugar     text,
  add column fiesta_direccion text,
  add column fiesta_mapa_url  text;
