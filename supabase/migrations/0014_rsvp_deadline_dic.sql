-- La boda se movió al 23 de enero de 2027: se reabre la confirmación en la
-- página hasta el 23 de diciembre de 2026 (fin del día, UTC-4).
update public.event
set rsvp_deadline = timestamptz '2026-12-23 23:59:59-04'
where id = 1;
