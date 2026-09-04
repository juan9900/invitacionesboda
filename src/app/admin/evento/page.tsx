import { getEvent } from '@/lib/event'
import { updateEvent } from '@/app/actions/event'

export const dynamic = 'force-dynamic'

// Las fechas se guardan como "hora de reloj" fija en UTC (ver actions/event.ts),
// así que las leemos con los métodos getUTC* para mostrar la misma hora tipeada.
function toLocalInput(value: string | null): string {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
}

export default async function EventoPage() {
  const event = await getEvent()

  return (
    <div className="max-w-3xl">
      <h1 className="mb-2 text-2xl font-semibold">Datos de la boda</h1>
      <p className="mb-6 text-sm text-gray-600">
        Esta información se muestra en todas las invitaciones públicas.
      </p>

      <form action={updateEvent} className="flex flex-col gap-8">
        <fieldset className="rounded-lg border bg-white p-5">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
            Ceremonia
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Lugar"
              name="ceremonia_lugar"
              defaultValue={event.ceremonia_lugar}
              required
              placeholder="Ej: Iglesia de San Juan"
            />
            <Field
              label="Fecha y hora"
              name="ceremonia_fecha"
              type="datetime-local"
              defaultValue={toLocalInput(event.ceremonia_fecha)}
              required
            />
            <Field
              label="Dirección"
              name="ceremonia_direccion"
              defaultValue={event.ceremonia_direccion ?? ''}
              placeholder="Calle, número, ciudad"
              className="md:col-span-2"
            />
            <Field
              label="URL del mapa"
              name="ceremonia_mapa_url"
              type="url"
              defaultValue={event.ceremonia_mapa_url ?? ''}
              placeholder="https://maps.google.com/..."
              className="md:col-span-2"
            />
          </div>
        </fieldset>

        <fieldset className="rounded-lg border bg-white p-5">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
            Fiesta
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Título"
              name="fiesta_titulo"
              defaultValue={event.fiesta_titulo ?? ''}
              placeholder="Ej: Recepción"
            />
            <Field
              label="Lugar"
              name="fiesta_lugar"
              defaultValue={event.fiesta_lugar ?? ''}
              placeholder="Ej: Salón Los Jardines"
            />
            <Field
              label="Fecha y hora"
              name="fiesta_fecha"
              type="datetime-local"
              defaultValue={toLocalInput(event.fiesta_fecha)}
            />
            <Field
              label="Dirección"
              name="fiesta_direccion"
              defaultValue={event.fiesta_direccion ?? ''}
              placeholder="Calle, número, ciudad"
              className="md:col-span-2"
            />
            <Field
              label="URL del mapa"
              name="fiesta_mapa_url"
              type="url"
              defaultValue={event.fiesta_mapa_url ?? ''}
              placeholder="https://maps.google.com/..."
              className="md:col-span-2"
            />
          </div>
        </fieldset>

        <fieldset className="rounded-lg border bg-white p-5">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
            RSVP
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Fecha límite para confirmar"
              name="rsvp_deadline"
              type="datetime-local"
              defaultValue={toLocalInput(event.rsvp_deadline)}
              required
            />
          </div>
        </fieldset>

        <fieldset className="rounded-lg border bg-white p-5">
          <legend className="px-2 text-sm font-semibold uppercase tracking-wider text-gray-700">
            Plantillas de WhatsApp
          </legend>
          <p className="mb-3 text-xs text-gray-600">
            El mensaje se elige según los pases del invitado y su idioma. Usa{' '}
            <code>{'{nombres}'}</code> y <code>{'{url}'}</code> como
            marcadores.
          </p>
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Español
              </p>
              <div className="flex flex-col gap-4">
                <TextArea
                  label="Invitado individual (1 pase)"
                  name="mensaje_whatsapp_tpl_individual"
                  defaultValue={event.mensaje_whatsapp_tpl_individual}
                  required
                />
                <TextArea
                  label="Pareja (2 pases)"
                  name="mensaje_whatsapp_tpl_pareja"
                  defaultValue={event.mensaje_whatsapp_tpl_pareja}
                  required
                />
                <TextArea
                  label="Familia (3 o más pases)"
                  name="mensaje_whatsapp_tpl_familia"
                  defaultValue={event.mensaje_whatsapp_tpl_familia}
                  required
                />
                <TextArea
                  label="Cortesía"
                  name="mensaje_whatsapp_tpl_cortesia"
                  defaultValue={event.mensaje_whatsapp_tpl_cortesia}
                  required
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                English
              </p>
              <div className="flex flex-col gap-4">
                <TextArea
                  label="Individual guest (1 pass)"
                  name="mensaje_whatsapp_tpl_individual_en"
                  defaultValue={event.mensaje_whatsapp_tpl_individual_en}
                  required
                />
                <TextArea
                  label="Couple (2 passes)"
                  name="mensaje_whatsapp_tpl_pareja_en"
                  defaultValue={event.mensaje_whatsapp_tpl_pareja_en}
                  required
                />
                <TextArea
                  label="Family (3+ passes)"
                  name="mensaje_whatsapp_tpl_familia_en"
                  defaultValue={event.mensaje_whatsapp_tpl_familia_en}
                  required
                />
                <TextArea
                  label="Courtesy"
                  name="mensaje_whatsapp_tpl_cortesia_en"
                  defaultValue={event.mensaje_whatsapp_tpl_cortesia_en}
                  required
                />
              </div>
            </div>
          </div>
        </fieldset>

        <div>
          <button
            type="submit"
            className="rounded bg-black px-5 py-2 text-white"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  className,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`flex flex-col gap-1 text-sm ${className ?? ''}`}>
      <span className="text-gray-700">{label}</span>
      <input
        {...rest}
        className="rounded border border-gray-300 px-3 py-2"
      />
    </label>
  )
}

function TextArea({
  label,
  ...rest
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-gray-700">{label}</span>
      <textarea
        {...rest}
        rows={3}
        className="rounded border border-gray-300 px-3 py-2 font-mono text-xs"
      />
    </label>
  )
}
