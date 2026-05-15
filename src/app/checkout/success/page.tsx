'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Download, ArrowRight, Loader2, AlertCircle, ExternalLink, Archive } from 'lucide-react'
import { useEffect, Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import posthog from 'posthog-js'
import { getDownloadUrl } from './actions'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [productData, setProductData] = useState<{ url: string, name: string, type: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      posthog.capture('purchase_success', {
        stripe_session_id: sessionId,
      })
      // Try to fetch download URL immediately
      handleFetchDownload()
    }
  }, [sessionId])

  const handleFetchDownload = async () => {
    if (!sessionId) return
    
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await getDownloadUrl(sessionId)
      if (result.error) {
        setError(result.error)
      } else if (result.downloadUrl) {
        setProductData({
          url: result.downloadUrl,
          name: result.productName || 'Your Product',
          type: result.productType || 'pdf'
        })
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (productData?.url) {
      if (productData.type === 'notion') {
        window.open(`/api/fulfill/notion?sessionId=${sessionId}`, '_blank')
      } else {
        window.open(productData.url, '_blank')
      }
    } else {
      handleFetchDownload()
    }
  }

  const getButtonContent = () => {
    if (isLoading) return <Loader2 className="mr-2 h-5 w-5 animate-spin" />
    if (!productData) return <><Download className="mr-2 h-5 w-5" /> Forge Fulfillment Link</>

    switch (productData.type) {
      case 'notion':
        return <><ExternalLink className="mr-2 h-5 w-5" /> Duplicate Notion Template</>
      case 'bundle':
      case 'automation':
        return <><Archive className="mr-2 h-5 w-5" /> Download Asset Bundle (ZIP)</>
      default:
        return <><Download className="mr-2 h-5 w-5" /> Download Product (PDF)</>
    }
  }

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
          Your digital assets have been forged. Access them directly below or via the link sent to your email.
        </p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3 text-left">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <Button 
            onClick={handleDownload}
            disabled={isLoading}
            className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-lg font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all active:scale-[0.98]"
          >
            {getButtonContent()}
          </Button>
          
          <Link href="/" className="block">
            <Button variant="ghost" className="w-full text-silver-slate hover:text-white hover:bg-white/5 py-6">
              Return to Home
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-sm text-zinc-600">
          Order ID: <span className="text-silver-slate font-mono">{sessionId ? sessionId.substring(0, 12) + '...' : 'ORD-PLACEHOLDER'}</span>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-deep-space flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
