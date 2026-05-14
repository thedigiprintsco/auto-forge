'use client'

import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const orders = [
  { id: 'ORD-7281', customer: 'alex.weaver@gmail.com', product: 'Solopreneur OS', amount: '$97.00', status: 'Delivered', date: 'May 14, 2026' },
  { id: 'ORD-7280', customer: 'marcus@forge.io', product: 'AI Marketing Pack', amount: '$49.00', status: 'Delivered', date: 'May 14, 2026' },
  { id: 'ORD-7279', customer: 'linda.smith@startup.com', product: 'ADHD Focus System', amount: '$67.00', status: 'Processing', date: 'May 13, 2026' },
  { id: 'ORD-7278', customer: 'david@agency.net', product: 'AI Agency Starter Kit', amount: '$197.00', status: 'Refunded', date: 'May 12, 2026' },
]

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-500/10 text-green-500 border-green-500/20'
    case 'Processing':
      return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    case 'Refunded':
      return 'bg-red-500/10 text-red-500 border-red-500/20'
    default:
      return 'bg-white/5 text-silver-slate border-white/10'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Delivered':
      return <CheckCircle2 className="h-3 w-3" />
    case 'Processing':
      return <Clock className="h-3 w-3" />
    case 'Refunded':
      return <AlertCircle className="h-3 w-3" />
    default:
      return null
  }
}

export default function AdminOrders() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight">Order Tracking</h1>
          <p className="text-silver-slate">Monitor sales and manage digital delivery status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-forge-gray border-white/5 text-white hover:bg-white/5">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search orders, customers, IDs..." 
              className="w-full bg-deep-space/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <Button variant="ghost" className="text-zinc-500 hover:text-white hover:bg-white/5">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider pl-2">Order ID</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Customer</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Product</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Amount</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Date</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider text-right pr-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pl-2 font-mono text-xs text-primary font-bold">{order.id}</td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{order.customer.split('@')[0]}</span>
                      <span className="text-xs text-zinc-500">{order.customer}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm text-silver-slate">{order.product}</span>
                  </td>
                  <td className="py-4 text-sm font-bold text-white">{order.amount}</td>
                  <td className="py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </td>
                  <td className="py-4 text-sm text-zinc-500">{order.date}</td>
                  <td className="py-4 text-right pr-2">
                    <button className="p-2 rounded-lg text-zinc-600 hover:text-white transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Support Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Unresolved Support Tickets</h4>
            <p className="text-xs text-silver-slate">3 orders require manual verification or have open queries.</p>
          </div>
          <Button size="sm" className="ml-auto bg-amber-500 text-deep-space hover:bg-amber-400 font-bold">Handle Now</Button>
        </div>
        
        <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-6 backdrop-blur-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShoppingCart className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Stripe Payout Status</h4>
            <p className="text-xs text-silver-slate">Next payout of $2,450 estimated for May 16, 2026.</p>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto text-silver-slate hover:text-white border border-white/5">View Details</Button>
        </div>
      </div>
    </div>
  )
}
