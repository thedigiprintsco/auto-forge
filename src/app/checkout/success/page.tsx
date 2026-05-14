import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Download, ArrowRight } from 'lucide-react'

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-deep-space text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-forge-gray/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-ai-teal/20 p-3">
            <CheckCircle2 className="h-12 w-12 text-ai-teal" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold font-display mb-2">Order Confirmed!</h1>
        <p className="text-silver-slate mb-8">
          Your digital assets have been forged. You should receive an email with your download links shortly.
        </p>

        <div className="space-y-4">
          <Button className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <Download className="mr-2 h-5 w-5" />
            Download Assets Now
          </Button>
          
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full text-silver-slate hover:text-white hover:bg-white/5 py-6">
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-sm text-zinc-600">
          Order ID: <span className="text-silver-slate font-mono">ORD-PLACEHOLDER</span>
        </div>
      </div>
    </div>
  )
}
