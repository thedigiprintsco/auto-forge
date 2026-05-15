'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check, Share2 } from 'lucide-react'

export function ReferralLinkCopy({ link }: { link: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 font-mono text-ai-teal overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-3 group/link">
        <Share2 className="h-4 w-4 text-zinc-600 group-hover/link:text-ai-teal transition-colors" />
        <span className="flex-1 overflow-hidden text-ellipsis">{link}</span>
      </div>
      <Button 
        onClick={handleCopy}
        className={`shrink-0 min-w-[160px] rounded-2xl py-4 h-auto font-bold transition-all ${
          copied 
            ? "bg-ai-teal/20 text-ai-teal border-ai-teal/30" 
            : "bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        }`}
        variant={copied ? "outline" : "default"}
      >
        {copied ? (
          <><Check className="h-4 w-4 mr-2" /> Copied to Clipboard</>
        ) : (
          <><Copy className="h-4 w-4 mr-2" /> Copy Referral Link</>
        )}
      </Button>
    </div>
  )
}
