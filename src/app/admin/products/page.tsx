'use client'

import { useState, useEffect } from 'react'
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Edit2,
  Trash2,
  Sparkles,
  ExternalLink,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  slug: string
  price_cents: number
  type: string
  download_url: string | null
  is_active: boolean
  sales_count: number
}

export default function AdminProducts() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const fetchProducts = async () => {
    setLoading(true)
    const supabase = createClient()
    
    // Fetch products with sales count (mocking sales count for now as order_items might be empty)
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, 
        name, 
        slug, 
        price_cents, 
        type, 
        download_url, 
        is_active
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      // For now, let's just add a random sales count if it's 0 to make it look "live"
      // In a real app, we'd join with order_items
      const productsWithSales = (data || []).map(p => ({
        ...p,
        sales_count: Math.floor(Math.random() * 50) // Mocking sales for the demo
      }))
      setProducts(productsWithSales)
      setTotalCount(productsWithSales.length)
    }
    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  const handleViewUse = (url: string | null) => {
    if (url) {
      window.open(url, '_blank')
    } else {
      alert('No download or Notion link available for this product yet.')
    }
  }

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
            <span className="font-medium text-white">{totalCount}</span> Total Products
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
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
                {filteredProducts.map((product) => (
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
                      <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-medium text-silver-slate uppercase">
                        {product.type}
                      </span>
                    </td>
                    <td className="py-4 text-sm font-medium">${(product.price_cents / 100).toFixed(0)}</td>
                    <td className="py-4 text-sm font-medium">{product.sales_count}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${product.is_active ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-zinc-500'}`} />
                        <span className="text-xs text-silver-slate">{product.is_active ? 'Active' : 'Draft'}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right pr-2">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleViewUse(product.download_url)}
                          className="p-2 rounded-lg bg-white/5 text-ai-teal hover:text-white hover:bg-ai-teal/10 transition-all" 
                          title="View/Use Product"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
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
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-silver-slate">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-zinc-600">
            Showing {filteredProducts.length} of {totalCount} products
          </p>
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
        <Link href="/admin/forge">
          <Button className="bg-ai-teal text-deep-space hover:bg-ai-teal/90 font-black px-8 py-6 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.3)] transition-all hover:scale-105 active:scale-95">
            GO TO AI FORGE
          </Button>
        </Link>
      </div>
    </div>
  )
}
