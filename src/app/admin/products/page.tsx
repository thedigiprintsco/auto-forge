'use client'

import { useState } from 'react'
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit2,
  Trash2,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const products = [
  { id: '1', name: 'Solopreneur OS', slug: 'solopreneur-os', price: '$97', type: 'Notion', category: 'Productivity', sales: 42, status: 'Active' },
  { id: '2', name: 'AI Marketing Pack', slug: 'ai-marketing-power-pack', price: '$49', type: 'Prompts', category: 'Marketing', sales: 128, status: 'Active' },
  { id: '3', name: 'ADHD Focus System', slug: 'adhd-focus-system', price: '$67', type: 'Notion', category: 'Wellness', sales: 85, status: 'Active' },
  { id: '4', name: 'AI Agency Starter Kit', slug: 'ai-agency-kit', price: '$197', type: 'Bundle', category: 'Business', sales: 12, status: 'Draft' },
]

export default function AdminProducts() {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display tracking-tight">Product Management</h1>
          <p className="text-silver-slate">Manage your digital assets and AI-generated bundles.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-forge-gray border-white/5 text-white hover:bg-white/5">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-primary text-white hover:bg-primary/90 font-bold">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="bg-forge-gray/50 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-deep-space/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>
          <div className="h-8 w-px bg-white/5 mx-2" />
          <div className="flex items-center gap-2 text-sm text-silver-slate">
            <Package className="h-4 w-4" />
            <span className="font-medium text-white">24</span> Total Products
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-left">
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider pl-2">Product</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Type</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Price</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Sales</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider">Status</th>
                <th className="pb-4 pt-0 font-medium text-silver-slate text-xs uppercase tracking-wider text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-deep-space border border-white/5 flex items-center justify-center text-primary group-hover:border-primary/30 transition-colors">
                        <Package className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{product.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-medium text-silver-slate">
                      {product.type}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-medium">{product.price}</td>
                  <td className="py-4 text-sm font-medium">{product.sales}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${product.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-zinc-500'}`} />
                      <span className="text-xs text-silver-slate">{product.status}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 rounded-lg bg-white/5 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-zinc-600">Showing 1-4 of 24 products</p>
          <div className="flex gap-2">
            <Button disabled variant="outline" className="h-8 text-xs bg-forge-gray border-white/5 text-zinc-500">Previous</Button>
            <Button variant="outline" className="h-8 text-xs bg-forge-gray border-white/5 text-white hover:bg-white/5">Next</Button>
          </div>
        </div>
      </div>
      
      {/* AI Generate Prompt Pack CTA */}
      <div className="bg-gradient-to-r from-ai-teal/10 via-deep-space to-primary/10 border border-ai-teal/20 rounded-3xl p-8 backdrop-blur-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-ai-teal/20 flex items-center justify-center text-ai-teal shadow-[0_0_20px_rgba(45,212,191,0.2)]">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display">Expand the Forge</h3>
            <p className="text-silver-slate text-sm max-w-md">Instantly generate a new premium prompt pack or Notion template in a high-demand niche using our AI product engine.</p>
          </div>
        </div>
        <Button className="bg-ai-teal text-deep-space hover:bg-ai-teal/90 font-black px-8 py-6 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all hover:scale-105 active:scale-95">
          GO TO AI FORGE
        </Button>
      </div>
    </div>
  )
}
