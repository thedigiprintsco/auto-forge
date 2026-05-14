'use client'

import Image from 'next/image'
import { Check, Sparkles, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCheckout } from '@/hooks/use-checkout'

const bundles = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000', // Solopreneur OS
    name: 'Solopreneur OS',
    headline: 'The Central Command for Your One-Person Empire.',
    price: '$97',
    benefit: 'Reclaim 15+ hours a week by centralizing your business operations into one seamless, distraction-free environment.',
    features: [
      'Unified CRM: Manage clients and leads in Notion.',
      'Project Hub: Track every task in a high-performance dashboard.',
      'Automated Finance Tracker: Instant insights into your revenue.',
    ],
    accent: 'primary',
    image: '/solopreneur-os-thumb.png',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'AI Marketing Power-Pack',
    headline: 'Your Personal Marketing Team, In a Single ZIP.',
    price: '$49',
    benefit: 'Turn AI from a "toy" into a high-output content engine that drives leads and sales 24/7.',
    features: [
      '500+ Tested Prompts: High-conversion hooks for social media.',
      'SEO Article Architect: Generate ranking content in minutes.',
      'Email Sequence Suite: Automated sequences that actually sell.',
    ],
    accent: 'secondary',
    featured: true,
    image: '/ai-marketing-power-pack-thumb.png',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'ADHD Focus System',
    headline: 'Productivity That Respects Your Brain.',
    price: '$67',
    benefit: 'Stop fighting against your brain. Use a system built for neurodivergent focus to crush your goals.',
    features: [
      'Visual Task Management: Dopamine-friendly workflow.',
      'Brain Dump Terminal: Capture ideas instantly.',
      'Energy-Level Tracking: Match tasks to your focus cycles.',
    ],
    accent: 'accent',
    image: '/adhd-focus-system-thumb.png',
  },
]

export default function Bundles() {
  const { checkout, isLoading } = useCheckout()

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
        
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-12 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {bundles.map((bundle) => (
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
                  {bundle.features.map((feature) => (
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
