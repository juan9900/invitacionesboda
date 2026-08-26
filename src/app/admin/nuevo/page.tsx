import { redirect } from 'next/navigation'
import { createGuest } from '@/app/actions/guests'
import { PasesCortesiaFields } from '@/app/admin/_components/pases-cortesia-fields'

export default function NuevoInvitado() {
  async function action(formData: FormData) {
    'use server'
    const { slug } = await createGuest(formData)
    redirect(`/admin/nuevo/exito?slug=${slug}`)
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">
        Nuevo invitado
      </h1>
      <form
        action={action}
        className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      >
        <Field label="Nombres" name="nombres" required />
        <PasesCortesiaFields defaultPases={1} defaultCortesia={false} />
        <Field
          label="Teléfono (con prefijo, ej. +34666...)"
          name="telefono"
          type="tel"
          placeholder="+34..."
        />
        <SelectField label="Lado" name="lado">
          <option value="">— Sin asignar —</option>
          <option value="novio">Del novio</option>
          <option value="novia">De la novia</option>
        </SelectField>
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 font-medium text-white transition hover:bg-black"
        >
          Crear
        </button>
      </form>
    </div>
  )
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      <span>{label}</span>
      <input
        {...rest}
        className="rounded border border-gray-300 bg-white px-3 py-2 text-base font-normal text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
      />
    </label>
  )
}

function SelectField({
  label,
  children,
  ...rest
}: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      <span>{label}</span>
      <select
        {...rest}
        className="rounded border border-gray-300 bg-white px-3 py-2 text-base font-normal text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/20"
      >
        {children}
      </select>
    </label>
  )
}
