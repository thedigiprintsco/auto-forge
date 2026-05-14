import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const tiers = [
  {
    name: 'Starter',
    id: 'tier-starter',
    price: '$29',
    description: 'Perfect for new solopreneurs looking to get organized.',
    features: ['Access to 3 basic templates', 'Community support', 'Monthly AI prompt pack updates', 'Basic sales dashboard'],
    featured: false,
  },
  {
    name: 'Pro OS',
    id: 'tier-pro',
    price: '$97',
    description: 'The complete system for scaling your digital product business.',
    features: [
      'Access to ALL templates',
      'Priority email support',
      'Weekly premium prompt packs',
      'Advanced automation blueprints',
      'Custom branding kits',
      'Lifetime updates'
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    price: '$197',
    description: 'For teams looking to build fully autonomous business units.',
    features: [
      'White-label options',
      '1-on-1 strategy call',
      'Custom AI agent development',
      'Private API access',
      'Unlimited product generation',
      'Dedicated success manager'
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-white">Pricing</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Choose the plan that fits <br />
            <span className="text-zinc-500">your stage of growth</span>
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-none lg:grid-cols-3 lg:gap-x-8">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-3xl p-8 ring-1 ring-white/10 ${
                tier.featured ? 'bg-white/5 ring-white/20' : 'bg-black'
              }`}
            >
              <h3 className="text-lg font-semibold leading-8 text-white">{tier.name}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-white">{tier.price}</span>
                <span className="text-sm font-semibold leading-6 text-zinc-400">/one-time</span>
              </p>
              <Button
                className={`mt-6 h-12 ${
                  tier.featured
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
              >
                Buy now
              </Button>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-zinc-400">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-white" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
