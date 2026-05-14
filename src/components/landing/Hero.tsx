'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'

export default function Hero() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setIsJoined(true)
        setEmail('')
      }
    } catch (err) {
      console.error('Failed to join waitlist:', err)
    } finally {
      setIsLoading(false)
    }
  }

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
          
          <div className="mt-10 max-w-md mx-auto">
            {isJoined ? (
              <div className="bg-ai-teal/10 border border-ai-teal/20 rounded-2xl p-4 flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-500 text-center">
                <Sparkles className="h-5 w-5 text-ai-teal flex-shrink-0" />
                <span className="text-white font-bold">You're in the Forge. Welcome.</span>
              </div>
            ) : (
              <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email for early access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-forge-gray/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-primary text-white hover:bg-primary/90 px-8 h-auto py-3 font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all active:scale-95"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Join the Waitlist'}
                </Button>
              </form>
            )}
            <p className="mt-4 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
              Join 800+ solopreneurs building with AI.
            </p>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-center">
            <Link href="#bundles" className="text-sm font-bold text-silver-slate hover:text-white transition-colors">
              Browse Bundles
            </Link>
            <div className="h-1 w-1 rounded-full bg-zinc-800" />
            <Link href="#philosophy" className="text-sm font-bold text-silver-slate hover:text-white transition-colors">
              Our Philosophy
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
