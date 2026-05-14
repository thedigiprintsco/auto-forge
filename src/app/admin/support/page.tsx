import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Search
} from 'lucide-react'
import SupportList from './SupportList'

export default async function SupportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/admin/support')
  }

  const { data: requests, error } = await supabase
    .from('support_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching support requests:', error)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-display tracking-tight text-white mb-2">Support Center</h1>
          <p className="text-silver-slate">Manage incoming requests from the AI Support Chatbot.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search requests..." 
              className="bg-forge-gray/50 border border-white/5 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-zinc-500">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Total Requests</span>
          </div>
          <p className="text-3xl font-black text-white">{requests?.length || 0}</p>
        </div>
        <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-ai-teal">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Open Cases</span>
          </div>
          <p className="text-3xl font-black text-white">
            {requests?.filter(r => r.status === 'open').length || 0}
          </p>
        </div>
        <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Resolved</span>
          </div>
          <p className="text-3xl font-black text-white">
            {requests?.filter(r => r.status === 'resolved').length || 0}
          </p>
        </div>
      </div>

      {/* Requests List Container */}
      <div className="bg-forge-gray/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-white/[0.02]">
          <h2 className="font-bold text-white">Recent Interactions</h2>
        </div>
        
        <SupportList initialRequests={requests || []} />
      </div>
      
      <p className="text-center text-xs text-zinc-600 italic">
        Tip: Reply directly via email for the most seamless customer experience.
      </p>
    </div>
  )
}
