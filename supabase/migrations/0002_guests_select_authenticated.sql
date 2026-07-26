-- Permitir SELECT y UPDATE de guests también a usuarios autenticados
-- (antes solo anon, lo cual rompía la vista cuando el admin abría /{slug}
-- estando logueado con su sesión Supabase).
-- La defensa real sigue siendo el trigger guests_anon_update_guard + el
-- slug como "secreto" público.

drop policy if exists "guests select for anon" on public.guests;
create policy "guests select public"
  on public.guests for select
  to anon, authenticated
  using (true);

drop policy if exists "guests update for anon (RSVP only via trigger)" on public.guests;
create policy "guests update public (RSVP only via trigger)"
  on public.guests for update
  to anon, authenticated
  using (true)
  with check (true);
