'use client'

import { useState } from 'react'
import { 
  Mail, 
  Clock, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Trash2,
  MoreVertical,
  MessageSquare
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveSupportRequest, deleteSupportRequest } from './actions'

interface SupportRequest {
  id: string
  email: string
  message: string
  chat_history: any
  status: string
  created_at: string
}

export default function SupportList({ initialRequests }: { initialRequests: SupportRequest[] }) {
  const [requests, setRequests] = useState(initialRequests)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleResolve = async (id: string) => {
    setLoadingId(id)
    try {
      await resolveSupportRequest(id)
      setRequests(requests.map(r => r.id === id ? { ...r, status: 'resolved' } : r))
    } catch (error) {
      console.error('Failed to resolve:', error)
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this request?')) return
    
    setLoadingId(id)
    try {
      await deleteSupportRequest(id)
      setRequests(requests.filter(r => r.id !== id))
    } catch (error) {
      console.error('Failed to delete:', error)
    } finally {
      setLoadingId(null)
    }
  }

  if (requests.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="h-16 w-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-zinc-600" />
        </div>
        <h3 className="text-white font-bold mb-1">No requests yet</h3>
        <p className="text-zinc-500 text-sm max-w-xs mx-auto">
          Incoming requests from your AI chatbot will appear here for manual follow-up.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-white/5">
      {requests.map((request) => (
        <div key={request.id} className="group hover:bg-white/[0.02] transition-colors">
          <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Status & User */}
            <div className="lg:w-64 space-y-1">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "h-1.5 w-1.5 rounded-full shadow-[0_0_8px]",
                  request.status === 'open' ? "bg-ai-teal shadow-ai-teal/50" : "bg-zinc-500 shadow-zinc-500/50"
                )} />
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-tighter",
                  request.status === 'open' ? "text-ai-teal" : "text-zinc-500"
                )}>
                  {request.status} Case
                </span>
              </div>
              <p className="text-sm font-bold text-white truncate flex items-center gap-2">
                <Mail className="h-3 w-3 text-zinc-500" />
                {request.email}
              </p>
              <div className="flex items-center gap-2 text-zinc-500">
                <Clock className="h-3 w-3" />
                <span className="text-[10px]">
                  {new Date(request.created_at).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Message Preview */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Last Message</p>
              <p className="text-sm text-silver-slate line-clamp-2 italic">
                &quot;{request.message}&quot;
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {request.status === 'open' && (
                <button 
                  onClick={() => handleResolve(request.id)}
                  disabled={loadingId === request.id}
                  className="h-10 px-4 rounded-xl bg-ai-teal/10 text-ai-teal text-xs font-bold hover:bg-ai-teal/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Resolve
                </button>
              )}
              <a 
                href={`mailto:${request.email}`}
                className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                title="Reply via email"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button 
                onClick={() => handleDelete(request.id)}
                disabled={loadingId === request.id}
                className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all disabled:opacity-50"
                title="Delete request"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
