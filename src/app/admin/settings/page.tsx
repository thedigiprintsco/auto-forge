import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { 
  Shield, 
  Key, 
  User, 
  Mail, 
  CreditCard, 
  Bot, 
  Share2, 
  Send as SendIcon,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/admin/settings')
  }

  const keys = [
    {
      name: 'Stripe',
      description: 'Payment processing and checkout sessions',
      icon: CreditCard,
      status: process.env.STRIPE_SECRET_KEY ? 'Connected' : 'Missing',
      env: 'STRIPE_SECRET_KEY'
    },
    {
      name: 'Supabase',
      description: 'Database, Auth, and Storage',
      icon: Shield,
      status: process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Connected' : 'Missing',
      env: 'NEXT_PUBLIC_SUPABASE_URL'
    },
    {
      name: 'AI (OpenAI/Claude)',
      description: 'Autonomous product generation engine',
      icon: Bot,
      status: (process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY) ? 'Connected' : 'Missing',
      env: 'OPENAI_API_KEY / CLAUDE_API_KEY'
    },
    {
      name: 'Social (Buffer)',
      description: 'Autonomous social media posting',
      icon: Share2,
      status: process.env.BUFFER_ACCESS_TOKEN ? 'Connected' : 'Missing',
      env: 'BUFFER_ACCESS_TOKEN'
    },
    {
      name: 'Email (Resend)',
      description: 'Order confirmations and marketing automation',
      icon: SendIcon,
      status: process.env.RESEND_API_KEY ? 'Connected' : 'Missing',
      env: 'RESEND_API_KEY'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black font-display tracking-tight text-white mb-2">Platform Settings</h1>
        <p className="text-silver-slate">Manage your credentials, profile, and autonomous configurations.</p>
      </div>

      {/* Admin Profile Section */}
      <section className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Admin Profile</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Mail className="h-3 w-3" />
              Email Address
            </label>
            <div className="bg-deep-space/50 border border-white/5 rounded-xl px-4 py-3 text-white font-medium">
              {user.email}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Shield className="h-3 w-3" />
              Role
            </label>
            <div className="bg-deep-space/50 border border-white/5 rounded-xl px-4 py-3 text-ai-teal font-bold uppercase text-xs tracking-tighter flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-ai-teal shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
              Platform Owner
            </div>
          </div>
        </div>
      </section>

      {/* Platform Keys Section */}
      <section className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-ai-teal/10 flex items-center justify-center text-ai-teal">
            <Key className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Platform Credentials</h2>
        </div>

        <div className="space-y-4">
          {keys.map((key) => (
            <div key={key.name} className="group flex items-center justify-between p-4 rounded-2xl bg-deep-space/30 border border-white/5 hover:border-white/10 transition-all">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${key.status === 'Connected' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  <key.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{key.name}</h3>
                  <p className="text-xs text-silver-slate">{key.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="hidden md:block text-right">
                  <p className="text-[10px] text-zinc-600 font-mono mb-1">{key.env}</p>
                  <div className={`text-[10px] font-black uppercase tracking-tighter flex items-center justify-end gap-1.5 ${key.status === 'Connected' ? 'text-green-500' : 'text-red-500'}`}>
                    {key.status === 'Connected' ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        Status: Connected
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" />
                        Status: Missing
                      </>
                    )}
                  </div>
                </div>
                <div className={`h-2 w-2 rounded-full ${key.status === 'Connected' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-6 text-center text-xs text-zinc-500 italic">
          Credentials are managed via Vercel environment variables for maximum security. 
          Contact systems administrator to update keys.
        </p>
      </section>

      {/* Future Roadmap / Coming Soon */}
      <section className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Clock className="h-24 w-24 text-primary" />
        </div>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-white">System Roadmap</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
            <h4 className="text-sm font-bold text-zinc-400 mb-1">Domain Management</h4>
            <p className="text-xs text-zinc-600 italic">Coming Soon: Connect and manage custom domains directly from the dashboard.</p>
          </div>
          <div className="p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01]">
            <h4 className="text-sm font-bold text-zinc-400 mb-1">Automated Backups</h4>
            <p className="text-xs text-zinc-600 italic">Coming Soon: One-click snapshots of your entire digital product catalog.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
