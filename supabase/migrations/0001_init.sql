-- Extensiones
create extension if not exists "pgcrypto";

-- ============================================================
-- Tabla event (singleton, 1 sola fila)
-- ============================================================
create table public.event (
  id                              int primary key default 1,
  ceremonia_titulo                text not null,
  ceremonia_fecha                 timestamptz not null,
  ceremonia_lugar                 text not null,
  ceremonia_direccion             text,
  ceremonia_mapa_url              text,
  fiesta_titulo                   text,
  fiesta_fecha                    timestamptz,
  fiesta_lugar                    text,
  fiesta_direccion                text,
  fiesta_mapa_url                 text,
  rsvp_deadline                   timestamptz not null,
  mensaje_whatsapp_tpl_ceremonia  text not null default
    '¡Hola {nombres}! Te invitamos a nuestra boda. Aquí tu invitación: {url}',
  mensaje_whatsapp_tpl_completo   text not null default
    '¡Hola {nombres}! Te invitamos a nuestra boda (ceremonia y celebración). Aquí tu invitación: {url}',
  constraint event_singleton check (id = 1)
);

insert into public.event (id, ceremonia_titulo, ceremonia_fecha, ceremonia_lugar, rsvp_deadline)
values (1, 'Por completar', now() + interval '1 year', 'Por completar', now() + interval '11 months');

-- ============================================================
-- Tabla guests
-- ============================================================
create table public.guests (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  nombres             text not null,
  pases               int not null check (pases > 0),
  telefono            text,
  incluye_fiesta      boolean not null default false,
  confirmado          boolean,
  pases_confirmados   int check (pases_confirmados is null or pases_confirmados >= 0),
  confirmado_at       timestamptz,
  created_at          timestamptz not null default now()
);

create index guests_confirmado_idx on public.guests (confirmado);

-- ============================================================
-- RLS
-- ============================================================
alter table public.guests enable row level security;
alter table public.event  enable row level security;

create policy "event readable by all"
  on public.event for select
  to anon, authenticated
  using (true);

-- Lectura pública de guests: se permite a nivel RLS pero en la app
-- todas las lecturas pasan por server actions que filtran por slug.
-- (Defensa en profundidad: el slug es el secreto.)
create policy "guests select for anon"
  on public.guests for select
  to anon
  using (true);

create policy "guests update for anon (RSVP only via trigger)"
  on public.guests for update
  to anon
  using (true)
  with check (true);

-- Trigger que limita las columnas modificables por anon a las de RSVP
create or replace function public.guests_anon_update_guard()
returns trigger language plpgsql as $$
begin
  if auth.role() = 'anon' then
    if new.slug           is distinct from old.slug
    or new.nombres        is distinct from old.nombres
    or new.pases          is distinct from old.pases
    or new.telefono       is distinct from old.telefono
    or new.incluye_fiesta is distinct from old.incluye_fiesta
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

create trigger guests_anon_update_guard
  before update on public.guests
  for each row execute function public.guests_anon_update_guard();
