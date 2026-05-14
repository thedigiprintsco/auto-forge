import { Cpu, Zap, Shield, BarChart3, Globe, MessageSquare } from 'lucide-react'

const features = [
  {
    name: 'AI Product Generator',
    description: 'Instantly create custom Notion templates and prompt packs tailored to your specific niche.',
    icon: Cpu,
  },
  {
    name: 'Full Automation Layer',
    description: 'Set up cron jobs and webhooks to manage your sales, social posts, and customer delivery 24/7.',
    icon: Zap,
  },
  {
    name: 'Secure Infrastructure',
    description: 'Built on Supabase and Stripe, ensuring your business and customer data are always protected.',
    icon: Shield,
  },
  {
    name: 'Advanced Analytics',
    description: 'Track every conversion, click, and customer journey with integrated Google Analytics and Posthog.',
    icon: BarChart3,
  },
  {
    name: 'Global Reach',
    description: 'Sell to anyone, anywhere with instant digital delivery and localized payment support.',
    icon: Globe,
  },
  {
    name: 'AI Support Chatbot',
    description: 'Handle FAQs, refunds, and upsells automatically with our integrated customer support agent.',
    icon: MessageSquare,
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-white">Scale Faster</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to build <br />
            <span className="text-zinc-500">an autonomous digital empire</span>
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon className="h-5 w-5 flex-none text-zinc-400" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
