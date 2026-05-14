'use client'

import Image from 'next/image'
import { Check, Sparkles, Loader2, AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCheckout } from '@/hooks/use-checkout'

interface Product {
  id: string
  name: string
  description: string
  price_cents: number
  slug: string
  image_url: string | null
  metadata: {
    value_prop?: string
    features?: string[]
  } | null
}

export default function Bundles({ initialProducts }: { initialProducts: Product[] }) {
  const { checkout, isLoading, error, setError } = useCheckout()

  // Map Supabase products to the display format
  const products = initialProducts.map((p, index) => ({
    id: p.id,
    name: p.name,
    headline: p.metadata?.value_prop || p.description,
    price: `$${(p.price_cents / 100).toFixed(0)}`,
    benefit: p.description,
    features: p.metadata?.features || [
      'Digital Access',
      'Lifetime Updates',
      'Premium Support'
    ],
    accent: index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent',
    featured: p.slug === 'ai-marketing-power-pack',
    image: p.image_url || '/hero.png',
  }))

  return (
    <section id="bundles" className="py-24 sm:py-32 bg-deep-space">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-ai-teal">The Forge</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
            Core Infrastructure <br />
            <span className="text-silver-slate">for your Digital Empire</span>
          </p>
        </div>
        
        {error && (
          <div className="mx-auto mt-8 max-w-lg rounded-2xl bg-red-500/10 border border-red-500/20 p-4 flex items-center justify-between text-red-400">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm font-medium">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="p-1 hover:bg-white/5 rounded-lg transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-12 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {products.map((bundle) => (
            <div
              key={bundle.name}
              className={`relative flex flex-col rounded-3xl border border-white/5 bg-forge-gray/50 backdrop-blur-sm overflow-hidden ${
                bundle.featured ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              {bundle.featured && (
                <div className="absolute top-4 right-4 z-20 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white flex items-center gap-1 shadow-lg">
                  <Sparkles className="h-3 w-3" />
                  MOST POPULAR
                </div>
              )}
              
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={bundle.image} 
                  alt={bundle.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forge-gray to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-8 pt-4">
                <h3 className="text-xl font-bold text-white font-display">{bundle.name}</h3>
                <p className={`mt-2 text-sm font-semibold ${
                  bundle.accent === 'primary' ? 'text-primary' : 
                  bundle.accent === 'secondary' ? 'text-ai-teal' : 
                  'text-accent'
                }`}>{bundle.headline}</p>
                <p className="mt-4 text-sm text-silver-slate leading-relaxed">{bundle.benefit}</p>
                
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">{bundle.price}</span>
                  <span className="text-sm font-semibold text-silver-slate">/one-time</span>
                </div>
                
                <Button 
                  onClick={() => checkout(bundle.id)}
                  disabled={isLoading}
                  className="mt-8 bg-white text-black hover:bg-zinc-200 font-bold cursor-pointer"
                >
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Get Instant Access'}
                </Button>
                
                <ul className="mt-8 space-y-4 text-sm leading-6 text-silver-slate">
                  {bundle.features.map((feature: string) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-5 w-5 flex-none text-ai-teal" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
