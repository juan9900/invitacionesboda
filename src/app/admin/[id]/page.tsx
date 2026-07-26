import { notFound, redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import {
  deleteGuest,
  setRsvpManual,
  updateGuest,
} from '@/app/actions/guests'

type Guest = {
  id: string
  slug: string
  nombres: string
  pases: number
  telefono: string | null
  incluye_fiesta: boolean
  confirmado: boolean | null
  pases_confirmados: number | null
  confirmado_at: string | null
}

export default async function EditarInvitado({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .maybeSingle<Guest>()
  if (!data) notFound()

  const onUpdate = async (formData: FormData) => {
    'use server'
    await updateGuest(id, formData)
    redirect('/admin')
  }

  const onDelete = async () => {
    'use server'
    await deleteGuest(id)
    redirect('/admin')
  }

  const onRsvp = async (formData: FormData) => {
    'use server'
    await setRsvpManual(id, formData)
  }

  return (
    <div className="grid max-w-3xl gap-8 md:grid-cols-2">
      <section>
        <h1 className="mb-4 text-2xl font-semibold">Editar invitado</h1>
        <p className="mb-4 text-sm text-gray-600">
          Slug: <code>{data.slug}</code>
        </p>
        <form action={onUpdate} className="flex flex-col gap-3">
          <Field label="Nombres" name="nombres" defaultValue={data.nombres} required />
          <Field
            label="Pases"
            name="pases"
            type="number"
            defaultValue={data.pases}
            min={1}
            required
          />
          <Field
            label="Teléfono"
            name="telefono"
            type="tel"
            defaultValue={data.telefono ?? ''}
            placeholder="+34..."
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="incluye_fiesta"
              defaultChecked={data.incluye_fiesta}
            />
            <span>Incluye fiesta</span>
          </label>
          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Guardar
          </button>
        </form>

        <form action={onDelete} className="mt-6">
          <button
            type="submit"
            className="text-sm text-red-700 underline"
          >
            Borrar invitado
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Confirmación manual</h2>
        <p className="mb-3 text-sm text-gray-600">
          Estado actual:{' '}
          {data.confirmado === true
            ? `Confirmado (${data.pases_confirmados ?? 0} pases)`
            : data.confirmado === false
              ? 'Rechazó'
              : 'Pendiente'}
        </p>
        <form action={onRsvp} className="flex flex-col gap-2 rounded border bg-white p-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="confirmado" value="si" defaultChecked />
            Marcar como confirmado
          </label>
          <label className="flex flex-col gap-1 pl-6 text-sm">
            Pases confirmados (máx {data.pases})
            <input
              type="number"
              name="pases_confirmados"
              min={0}
              max={data.pases}
              defaultValue={data.pases_confirmados ?? data.pases}
              className="rounded border border-gray-300 px-2 py-1"
            />
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="confirmado" value="no" />
            Marcar como rechazado
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="confirmado" value="reset" />
            Devolver a pendiente
          </label>
          <button
            type="submit"
            className="mt-2 rounded bg-black px-4 py-2 text-white"
          >
            Aplicar
          </button>
        </form>
      </section>
    </div>
  )
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span>{label}</span>
      <input
        {...rest}
        className="rounded border border-gray-300 px-3 py-2"
      />
    </label>
  )
}
