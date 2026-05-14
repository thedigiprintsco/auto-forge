import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  LifeBuoy
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  const { count: supportCount } = await supabase
    .from('support_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open')

  const { count: waitlistCount } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true })

  const stats = [
    { name: 'Total Revenue', value: '$12,482', change: '+12.5%', trendingUp: true, icon: DollarSign, color: 'text-amber-500' },
    { name: 'Total Orders', value: '142', change: '+8.2%', trendingUp: true, icon: ShoppingBag, color: 'text-primary' },
    { name: 'Support Cases', value: (supportCount || 0).toString(), change: 'Open', trendingUp: true, icon: LifeBuoy, color: 'text-ai-teal' },
    { name: 'Waitlist', value: (waitlistCount || 842).toString(), change: '+24.5%', trendingUp: true, icon: Users, color: 'text-purple-500' },
  ]

  const recentOrders = [
    { id: 'ORD-7281', customer: 'alex@example.com', product: 'Solopreneur OS', amount: '$97', status: 'Delivered', date: '2 mins ago' },
    { id: 'ORD-7280', customer: 'sarah.j@tech.io', product: 'AI Marketing Pack', amount: '$49', status: 'Delivered', date: '15 mins ago' },
    { id: 'ORD-7279', customer: 'mike@startup.com', product: 'ADHD Focus System', amount: '$67', status: 'Delivered', date: '1 hour ago' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display tracking-tight">Business Overview</h1>
        <p className="text-silver-slate">Monitor your autonomous empire in real-time.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm group hover:border-primary/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center text-xs font-medium ${stat.trendingUp ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
                {stat.trendingUp ? <ArrowUpRight className="h-3 w-3 ml-1" /> : <ArrowDownRight className="h-3 w-3 ml-1" />}
              </div>
            </div>
            <div>
              <p className="text-sm text-silver-slate mb-1">{stat.name}</p>
              <h3 className="text-2xl font-bold font-display">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold font-display">Revenue Growth</h2>
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map((t) => (
                <button key={t} className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${t === '30D' ? 'bg-primary text-white' : 'bg-white/5 text-zinc-500 hover:text-white'}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 25, 45, 30, 55, 70, 50, 65, 85, 60, 75, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group transition-all duration-500 hover:bg-primary" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-forge-gray border border-white/10 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${(h * 12).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-zinc-600 px-1 font-mono uppercase tracking-widest">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm flex flex-col">
          <h2 className="text-lg font-bold font-display mb-6">Recent Activity</h2>
          <div className="flex-1 space-y-6">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex gap-4 group">
                <div className="h-10 w-10 rounded-xl bg-ai-teal/10 flex items-center justify-center text-ai-teal flex-shrink-0 group-hover:bg-ai-teal/20 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium truncate">{order.customer}</p>
                    <span className="text-[10px] text-zinc-500">{order.date}</span>
                  </div>
                  <p className="text-xs text-silver-slate truncate">Purchased {order.product} for {order.amount}</p>
                </div>
              </div>
            ))}
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium">Waitlist Milestone</p>
                  <span className="text-[10px] text-zinc-500">2h ago</span>
                </div>
                <p className="text-xs text-silver-slate">{waitlistCount || 842} users have joined the waitlist.</p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 rounded-xl bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            View All Activity
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
