import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 bg-deep-space">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <span className="inline-flex items-center rounded-full bg-forge-gray px-3 py-1 text-xs font-medium text-ai-teal ring-1 ring-inset ring-ai-teal/20">
              New: Solopreneur OS 2.0 is live
              <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl font-display">
            Scale Your Ambition, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-ai-teal">
              Automate Your Freedom.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-silver-slate max-w-2xl mx-auto">
            Premium, AI-powered digital assets and Notion operating systems designed to build 
            your autonomous business empire. Stop trading time for money—start forging wealth.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="#bundles">
              <Button size="lg" className="h-12 px-8 bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer">
                Explore the Forge
              </Button>
            </Link>
            <Link href="#bundles">
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 text-white hover:bg-white/5 cursor-pointer">
                View Best Sellers
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl border border-white/10 bg-forge-gray/50 p-2 backdrop-blur-sm shadow-2xl">
            <Image
              src="/hero.png"
              alt="EtherForge Solopreneur OS"
              width={1200}
              height={675}
              className="rounded-xl border border-white/5"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-space/40 to-transparent rounded-xl" />
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
    </section>
  )
}
