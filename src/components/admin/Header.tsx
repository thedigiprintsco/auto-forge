'use client'

import { Search, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 border-b border-white/5 bg-deep-space/50 backdrop-blur-md sticky top-0 z-30">
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets, orders, customers..." 
              className="w-full bg-forge-gray/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-forge-gray/50 border border-white/5 text-silver-slate hover:text-white transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full border-2 border-deep-space"></span>
          </button>
          
          <div className="h-10 w-10 rounded-xl bg-primary/20 border border-primary/20 flex items-center justify-center text-primary">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  )
}
