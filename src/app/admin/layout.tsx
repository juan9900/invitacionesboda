import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!(await isAdmin())) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/admin" className="font-semibold">
            Admin · Invitaciones
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/admin">Invitados</Link>
            <Link href="/admin/nuevo">Nuevo</Link>
            <Link href="/admin/evento">Datos boda</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-6">{children}</main>
    </div>
  )
}
