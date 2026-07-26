import 'server-only'
import { createClient } from '@/lib/supabase/server'

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  const email = data.user?.email?.toLowerCase()
  const admin = process.env.ADMIN_EMAIL?.toLowerCase()
  return !!email && !!admin && email === admin
}
