import { Target, Zap, TrendingUp } from 'lucide-react'

const pillars = [
  {
    name: 'AI-Native Design',
    description: 'Every tool is built to leverage the power of LLMs and automation.',
    icon: Zap,
  },
  {
    name: 'Systems Over Hustle',
    description: 'We prioritize repeatable systems that eliminate busywork.',
    icon: Target,
  },
  {
    name: 'High-Margin Freedom',
    description: 'Digital products are the ultimate vehicle for passive wealth.',
    icon: TrendingUp,
  },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-deep-space relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-base font-semibold leading-7 text-ai-teal">Our Philosophy</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
              The Age of the <br />
              <span className="text-silver-slate">Autonomous Entrepreneur.</span>
            </p>
            <div className="mt-6 text-lg leading-8 text-silver-slate space-y-6">
              <p>
                Traditional business models are breaking. The future belongs to the lean, the automated, and the AI-empowered.
              </p>
              <p>
                At <span className="text-white font-semibold">EtherForge</span>, we don’t just sell templates; we build the infrastructure for your autonomy. We believe that with the right tools, a single person can outperform a legacy agency.
              </p>
              <p>
                Our mission is to provide the &quot;Digital Iron&quot; you need to forge a business that runs while you sleep, grows while you travel, and scales without adding headcount.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {pillars.map((pillar) => (
              <div 
                key={pillar.name} 
                className="relative flex flex-col p-8 rounded-2xl border border-white/5 bg-forge-gray/50 backdrop-blur-sm hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-x-3 text-lg font-semibold text-white font-display">
                  <pillar.icon className="h-6 w-6 text-primary" />
                  {pillar.name}
                </div>
                <p className="mt-4 text-base text-silver-slate">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className="absolute -right-24 bottom-0 -z-10 h-64 w-64 rounded-full bg-ai-teal/5 blur-[80px]" />
    </section>
  )
}
