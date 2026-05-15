import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  ExternalLink, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  Info,
  Hammer,
  CreditCard,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ReferralLinkCopy } from './components'
import AssetVault from './AssetVault'

export default async function AffiliateDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?returnTo=/affiliate/dashboard')
  }

  const { data: affiliate } = await supabase
    .from('affiliates')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!affiliate) {
    redirect('/affiliate/signup')
  }

  // Fetch stats
  const { count: totalClicks } = await supabase
    .from('referral_clicks')
    .select('*', { count: 'exact', head: true })
    .eq('affiliate_id', affiliate.id)

  const { data: commissions } = await supabase
    .from('commissions')
    .select('*, order:orders(status, total_amount_cents)')
    .eq('affiliate_id', affiliate.id)
    .order('created_at', { ascending: false })

  const lifetimeEarnings = commissions?.reduce((acc, curr) => acc + curr.amount_cents, 0) || 0
  const pendingEarned = commissions?.filter(c => c.status === 'pending').reduce((acc, curr) => acc + curr.amount_cents, 0) || 0
  const totalConversions = commissions?.length || 0
  const conversionRate = totalClicks ? (totalConversions / totalClicks) * 100 : 0

  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL}?ref=${affiliate.referral_code}`

  return (
    <div className="min-h-screen bg-deep-space text-white p-4 md:p-8 lg:p-12 selection:bg-ai-teal/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold font-display tracking-tighter">Partner Forge</h1>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border flex items-center gap-1.5 ${
                affiliate.status === 'active' 
                  ? 'bg-ai-teal/10 border-ai-teal/20 text-ai-teal' 
                  : affiliate.status === 'pending'
                  ? 'bg-wealth-gold/10 border-wealth-gold/20 text-wealth-gold'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {affiliate.status === 'active' && <ShieldCheck className="h-3 w-3" />}
                {affiliate.status} Account
              </span>
            </div>
            <p className="text-silver-slate font-medium opacity-80">Sovereign Affiliate Command Center</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="ghost" className="text-silver-slate hover:text-white hover:bg-white/5 border border-white/5">
                Public Storefront <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              onClick={() => alert('Withdrawals are processed automatically on the 1st of every month via your connected payout method.')}
            >
              <CreditCard className="mr-2 h-4 w-4" /> Withdraw Funds
            </Button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Wallet Balance" 
            value={`$${(pendingEarned / 100).toFixed(2)}`} 
            icon="/affiliate/icon-payout.png"
            subtitle="Unpaid commissions"
            tooltip="Earnings from orders that haven't been paid out yet."
            gradient="from-wealth-gold/10 to-transparent"
            delay="delay-0"
          />
          <StatCard 
            title="Lifetime Earnings" 
            value={`$${(lifetimeEarnings / 100).toFixed(2)}`} 
            icon="/affiliate/icon-stats.png"
            subtitle="Total forged"
            tooltip="The total amount of commission you have earned since joining."
            gradient="from-ai-teal/10 to-transparent"
            delay="delay-75"
          />
          <StatCard 
            title="Forge Clicks" 
            value={totalClicks?.toString() || '0'} 
            icon="/affiliate/icon-referral-link.png"
            subtitle="Traffic directed"
            tooltip="Number of unique visitors who clicked your referral link."
            gradient="from-electric-blue/10 to-transparent"
            delay="delay-150"
          />
          <StatCard 
            title="Conversion Rate" 
            value={`${conversionRate.toFixed(1)}%`} 
            icon="/affiliate/icon-stats.png"
            subtitle="Sales efficiency"
            tooltip="The percentage of clicks that resulted in a successful purchase."
            gradient="from-purple-500/10 to-transparent"
            delay="delay-200"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Referral Engine */}
            <section className="bg-forge-gray/30 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden group shadow-2xl">
              <div className="absolute -top-10 -right-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 group-hover:rotate-12">
                <Image src="/affiliate/icon-referral-link.png" alt="" width={300} height={300} />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
                  Referral Engine
                  <span title="Clicks are tracked via cookie for 30 days">
                    <Info className="h-4 w-4 text-zinc-600 cursor-help hover:text-ai-teal transition-colors" />
                  </span>
                </h2>
                <p className="text-silver-slate mb-10 max-w-xl text-lg leading-relaxed">
                  Your unique referral link is your primary tool for wealth generation. Share it across your network to capture 20% from every forge sale.
                </p>
                
                <ReferralLinkCopy link={referralLink} />
                
                <div className="mt-12 flex flex-wrap items-center gap-8 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-ai-teal shadow-[0_0_10px_#2DD4BF]" />
                    30-Day Cookies
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-ai-teal shadow-[0_0_10px_#2DD4BF]" />
                    Last-Click Attribution
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-ai-teal shadow-[0_0_10px_#2DD4BF]" />
                    Real-time Logging
                  </div>
                </div>
              </div>
            </section>

            {/* Commissions History */}
            <section className="animate-in fade-in duration-1000 slide-in-from-bottom-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-display">Forge History</h2>
                <Button variant="ghost" size="sm" className="text-silver-slate hover:text-white group/all">
                  View Full History <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              <div className="bg-forge-gray/30 border border-white/5 rounded-3xl overflow-x-auto backdrop-blur-sm shadow-xl">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5">
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Date</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Order Reference</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Commission</th>
                      <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {commissions?.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-8 py-24 text-center">
                          <div className="flex flex-col items-center gap-6 opacity-30 group">
                             <div className="p-6 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-500">
                               <Hammer className="h-12 w-12" />
                             </div>
                             <div className="space-y-1">
                               <p className="text-xl font-bold text-white tracking-tighter">Digital Anvil Empty</p>
                               <p className="text-sm text-silver-slate italic">The forge is silent. Start referring to generate heat.</p>
                             </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      commissions?.map((c) => (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors group/row">
                          <td className="px-8 py-5 text-sm text-silver-slate font-mono">
                            {new Date(c.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-8 py-5">
                            <div className="text-sm font-bold text-white uppercase tracking-tight font-sans">
                              ORD-{c.order_id.substring(0, 8)}
                            </div>
                            <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">
                              Verified Sale
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="text-base font-bold text-ai-teal">
                              +${(c.amount_cents / 100).toFixed(2)}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-sm">
                            <span className={`flex items-center gap-2.5 font-bold text-[10px] uppercase tracking-[0.15em] ${
                              c.status === 'paid' ? 'text-ai-teal' : 'text-wealth-gold'
                            }`}>
                              <div className={`h-2 w-2 rounded-full ${
                                c.status === 'paid' 
                                  ? 'bg-ai-teal shadow-[0_0_10px_#2DD4BF]' 
                                  : 'bg-wealth-gold shadow-[0_0_10px_#F59E0B] animate-pulse'
                              }`} />
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Asset Vault */}
            <AssetVault />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-gradient-to-br from-ai-teal/20 to-electric-blue/20 border border-ai-teal/30 rounded-3xl p-8 relative overflow-hidden group shadow-2xl transition-all hover:border-ai-teal/50">
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:rotate-12 duration-500 scale-150">
                <Image src="/affiliate/badge-forge-partner.png" alt="" width={100} height={100} />
              </div>
              
              <h3 className="text-xl font-bold font-display mb-8">Partner Status</h3>
              <div className="flex items-center gap-5 mb-10">
                <div className="relative h-20 w-20">
                  <Image src="/affiliate/badge-forge-partner.png" alt="Forge Partner" fill className="object-contain drop-shadow-[0_0_20px_rgba(45,212,191,0.6)]" />
                </div>
                <div>
                  <div className="text-[10px] text-ai-teal font-bold uppercase tracking-[0.2em] mb-1">Certified Partner</div>
                  <div className="text-2xl font-bold text-white tracking-tighter font-display">Forge Elite</div>
                </div>
              </div>

              <ul className="space-y-5">
                <li className="flex gap-4 text-sm font-medium text-silver-slate items-start">
                  <CheckCircle className="h-5 w-5 text-ai-teal shrink-0 mt-0.5" />
                  Premium 20% Base Commission
                </li>
                <li className="flex gap-4 text-sm font-medium text-silver-slate items-start">
                  <CheckCircle className="h-5 w-5 text-ai-teal shrink-0 mt-0.5" />
                  Priority Payouts (NET-30)
                </li>
                <li className="flex gap-4 text-sm font-medium text-silver-slate items-start">
                  <CheckCircle className="h-5 w-5 text-ai-teal shrink-0 mt-0.5" />
                  Exclusive Beta Access
                </li>
              </ul>
            </section>

            <section className="bg-forge-gray/30 border border-white/5 rounded-3xl p-8 backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold font-display mb-6">Resources</h3>
              <div className="space-y-3">
                <ResourceLink title="Promotion Guide" />
                <ResourceLink title="Brand Guidelines" />
                <ResourceLink title="Success Stories" />
                <ResourceLink title="Payout Schedule" />
              </div>
            </section>

            <section className="bg-forge-gray/30 border border-white/5 rounded-3xl p-8 backdrop-blur-md text-center shadow-xl border-dashed">
              <h3 className="text-xl font-bold font-display mb-3 text-white">Need Support?</h3>
              <p className="text-sm text-silver-slate mb-8 leading-relaxed">
                Your designated success agent is standing by to help you scale your referral engine.
              </p>
              <Link href="/support">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl py-6 font-bold">
                  Contact Partner Support
                </Button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ 
  title, 
  value, 
  icon, 
  subtitle, 
  tooltip,
  gradient,
  delay
}: { 
  title: string, 
  value: string, 
  icon: string, 
  subtitle: string,
  tooltip: string,
  gradient: string,
  delay: string
}) {
  return (
    <div className={`bg-forge-gray/30 border border-white/5 rounded-3xl p-8 backdrop-blur-md transition-all hover:scale-[1.02] hover:border-electric-blue/50 relative overflow-hidden group shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-700 ${delay}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40 group-hover:opacity-60 transition-opacity`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-bold text-silver-slate uppercase tracking-[0.25em]">{title}</span>
          <div className="h-12 w-12 relative group-hover:scale-110 transition-transform duration-500">
            <Image src={icon} alt={title} fill className="object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
          </div>
        </div>
        
        <div className="text-4xl font-bold mb-2 font-mono tracking-tighter" title={tooltip}>
          {value}
        </div>
        
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
          <div className="h-1 w-1 rounded-full bg-zinc-700" />
          {subtitle}
        </div>
      </div>
    </div>
  )
}

function ResourceLink({ title }: { title: string }) {
  return (
    <Link href="#" className="flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all group">
      <span className="text-sm font-bold text-silver-slate group-hover:text-white transition-colors">{title}</span>
      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
    </Link>
  )
}
