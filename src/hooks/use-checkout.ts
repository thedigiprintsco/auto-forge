'use client'

import { useState } from 'react'
import posthog from 'posthog-js'

export function useCheckout() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkout = async (productId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Track checkout attempt (inside try-catch for safety)
      try {
        posthog.capture('checkout_started', { 
          product_id: productId,
          timestamp: new Date().toISOString()
        })
      } catch (phErr) {
        console.warn('PostHog capture failed:', phErr)
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      console.error('Checkout error:', err)
      setError(errorMessage)
      
      // Track checkout error
      try {
        posthog.capture('checkout_error', {
          product_id: productId,
          error: errorMessage
        })
      } catch (phErr) {
        console.warn('PostHog capture failed:', phErr)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { checkout, isLoading, error, setError }
}
