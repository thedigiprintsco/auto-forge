'use client'

import { Button } from '@/components/ui/button'
import { useCheckout } from '@/hooks/use-checkout'
import { Loader2, AlertCircle, X } from 'lucide-react'

export default function ProductCheckoutButton({ productId }: { productId: string }) {
  const { checkout, isLoading, error, setError } = useCheckout()

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 flex items-center justify-between text-red-400 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
          <button onClick={() => setError(null)} className="p-1 hover:bg-white/5 rounded-md transition-colors">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <Button
        onClick={() => checkout(productId)}
        disabled={isLoading}
        size="lg"
        className="w-full h-14 text-lg bg-white text-black hover:bg-zinc-200 font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            SECURE CHECKOUT...
          </>
        ) : (
          'CLAIM INSTANT ACCESS'
        )}
      </Button>
    </div>
  )
}
