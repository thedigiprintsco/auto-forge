'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Zap, 
  Settings,
  Shield,
  LogOut
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'AI Forge', href: '/admin/forge', icon: Zap },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-[260px] flex-col bg-forge-gray border-r border-white/5">
      <div className="flex h-16 items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold font-display text-white tracking-tight">
            Ether<span className="text-primary">Forge</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200',
                pathname === item.href
                  ? 'bg-primary/10 text-primary shadow-[0_0_15px_rgba(59,130,246,0.1)]'
                  : 'text-silver-slate hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon className={cn(
                'h-5 w-5',
                pathname === item.href ? 'text-primary' : 'text-zinc-500 group-hover:text-white'
              )} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-silver-slate hover:bg-red-500/10 hover:text-red-500 transition-colors">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}
