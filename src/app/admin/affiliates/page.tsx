import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, DollarSign, Clock, User } from 'lucide-react'
import { revalidatePath } from 'next/cache'

async function approveAffiliate(id: string) {
  'use server'
  const supabase = await createClient()
  await supabase
    .from('affiliates')
    .update({ status: 'active' })
    .eq('id', id)
  revalidatePath('/admin/affiliates')
}

async function suspendAffiliate(id: string) {
  'use server'
  const supabase = await createClient()
  await supabase
    .from('affiliates')
    .update({ status: 'suspended' })
    .eq('id', id)
  revalidatePath('/admin/affiliates')
}

export default async function AdminAffiliatesPage() {
  const supabase = await createClient()
  
  const { data: affiliates, error } = await supabase
    .from('affiliates')
    .select('*')
    .order('created_at', { ascending: false })

  // Since we can't easily join auth.users in a single query from public, 
  // we'll fetch the emails separately if needed or just show IDs for now.
  // Actually, let's try to join with customers table.
  const { data: affiliatesWithInfo } = await supabase
    .from('affiliates')
    .select(`
      *,
      customers:user_id (
        email,
        full_name
      )
    `)
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-display">Affiliate Management</h1>
        <div className="flex gap-4">
          <Button variant="outline">Export Reports</Button>
          <Button>Program Settings</Button>
        </div>
      </div>

      <div className="bg-forge-gray/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-silver-slate">Affiliate</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-silver-slate">Code</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-silver-slate">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-silver-slate">Commission %</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-silver-slate">Joined</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-silver-slate text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {!affiliatesWithInfo || affiliatesWithInfo.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 italic">
                  No affiliate applications found.
                </td>
              </tr>
            ) : (
              affiliatesWithInfo.map((aff: any) => (
                <tr key={aff.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-ai-teal/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-ai-teal" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {aff.customers?.full_name || 'Anonymous User'}
                        </div>
                        <div className="text-xs text-silver-slate">
                          {aff.customers?.email || aff.user_id.substring(0, 8)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-ai-teal">
                    {aff.referral_code}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      aff.status === 'active' 
                        ? 'bg-ai-teal/10 border-ai-teal/20 text-ai-teal' 
                        : aff.status === 'pending'
                        ? 'bg-wealth-gold/10 border-wealth-gold/20 text-wealth-gold'
                        : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                      {aff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {aff.commission_rate}%
                  </td>
                  <td className="px-6 py-4 text-sm text-silver-slate">
                    {new Date(aff.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {aff.status === 'pending' && (
                        <form action={approveAffiliate.bind(null, aff.id)}>
                          <Button size="sm" variant="outline" className="h-8 border-ai-teal/30 hover:bg-ai-teal/10 hover:text-ai-teal">
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                          </Button>
                        </form>
                      )}
                      {aff.status === 'active' && (
                        <form action={suspendAffiliate.bind(null, aff.id)}>
                          <Button size="sm" variant="outline" className="h-8 border-red-500/30 hover:bg-red-500/10 hover:text-red-400">
                            <XCircle className="h-4 w-4 mr-1" /> Suspend
                          </Button>
                        </form>
                      )}
                      <Button size="sm" variant="ghost" className="h-8">
                        View Stats
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
