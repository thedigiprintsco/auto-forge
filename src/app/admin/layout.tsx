import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // In production, you would also check for an 'admin' role in your user metadata or a separate profiles table.
  // For development, we allow access if a specific ENV is set or just log a warning.
  if (!user && process.env.NODE_ENV === 'production') {
    redirect('/auth/login?next=/admin')
  }

  return (
    <div className="flex h-screen bg-deep-space text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
