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
      console.log('Starting checkout for product:', productId)
      
      // Track checkout attempt (inside try-catch for safety)
      try {
        if (typeof window !== 'undefined' && posthog) {
          posthog.capture('checkout_started', { 
            product_id: productId,
            timestamp: new Date().toISOString()
          })
        }
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

      console.log('Checkout API response status:', response.status)
      
      let data
      try {
        data = await response.json()
      } catch (jsonErr) {
        console.error('Failed to parse checkout response as JSON:', jsonErr)
        throw new Error('Server returned an invalid response. Please try again later.')
      }

      if (!response.ok) {
        console.error('Checkout API error:', data.error || 'Unknown error')
        throw new Error(data.error || 'Something went wrong during checkout initialization')
      }

      if (data.url) {
        console.log('Redirecting to checkout URL:', data.url)
        window.location.href = data.url
      } else {
        console.error('No checkout URL in API response:', data)
        throw new Error('No checkout URL received from server')
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      console.error('Checkout hook error:', err)
      setError(errorMessage)
      
      // Provide a more visible error for the user
      if (typeof window !== 'undefined') {
        alert(`Checkout Error: ${errorMessage}`)
      }
      
      // Track checkout error
      try {
        if (typeof window !== 'undefined' && posthog) {
          posthog.capture('checkout_error', {
            product_id: productId,
            error: errorMessage
          })
        }
      } catch (phErr) {
        console.warn('PostHog capture failed:', phErr)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { checkout, isLoading, error, setError }
}
