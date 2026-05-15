import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'
import { Check, ArrowLeft, Shield, Clock, Zap } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/landing/Navbar'
import Footer from '@/components/landing/Footer'
import ProductCheckoutButton from './product-checkout-button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('name, description')
    .eq('slug', slug)
    .single()

  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.name} | EtherForge`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!product) {
    notFound()
  }

  const features = product.metadata?.features || [
    'Digital Access',
    'Lifetime Updates',
    'Premium Support',
    'Commercial License'
  ]

  return (
    <main className="min-h-screen bg-deep-space selection:bg-primary/30">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24 sm:py-32">
        <Link 
          href="/#bundles" 
          className="inline-flex items-center gap-2 text-silver-slate hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Forge
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Image/Visual */}
          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl border border-white/5 bg-forge-gray/50 overflow-hidden group shadow-2xl">
            <Image
              src={product.image_url || '/hero.png'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-60" />
            
            {/* Value Tag */}
            <div className="absolute top-6 left-6 rounded-full bg-primary/20 backdrop-blur-md border border-primary/20 px-4 py-2 text-sm font-bold text-primary flex items-center gap-2">
              <Zap className="h-4 w-4" />
              HIGH PERFORMANCE
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex flex-col">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-display tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-xl text-ai-teal font-medium tracking-wide">
                {product.metadata?.value_prop || 'Premium Infrastructure'}
              </p>
            </div>

            <p className="mt-8 text-lg text-silver-slate leading-relaxed">
              {product.description}
            </p>

            <div className="mt-12 p-8 rounded-3xl border border-white/5 bg-forge-gray/30 backdrop-blur-sm">
              <div className="flex items-baseline gap-x-2 mb-8">
                <span className="text-5xl font-bold tracking-tight text-white">
                  ${(product.price_cents / 100).toFixed(2)}
                </span>
                <span className="text-lg font-semibold text-silver-slate">/one-time</span>
              </div>

              <ProductCheckoutButton productId={product.id} />

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm text-silver-slate">
                  <Shield className="h-4 w-4 text-ai-teal" />
                  Secure Checkout
                </div>
                <div className="flex items-center gap-3 text-sm text-silver-slate">
                  <Clock className="h-4 w-4 text-ai-teal" />
                  Instant Delivery
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-8 border-t border-white/5 pt-12">
              <h3 className="text-xl font-bold text-white font-display uppercase tracking-widest text-sm">
                What's Included
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {features.map((feature: string) => (
                  <li key={feature} className="flex gap-x-3 text-silver-slate text-sm">
                    <Check className="h-5 w-5 flex-none text-ai-teal" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
