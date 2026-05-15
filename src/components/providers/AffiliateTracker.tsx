'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function TrackerContent() {
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  useEffect(() => {
    if (ref) {
      // Set cookie that expires in 30 days
      const expires = new Date()
      expires.setDate(expires.getDate() + 30)
      document.cookie = `ef_affiliate_code=${ref}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`
      
      // Log the click in the background
      fetch('/api/affiliate/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          referralCode: ref, 
          url: window.location.href, 
          referrer: document.referrer 
        })
      }).catch(err => console.error('Failed to track affiliate click:', err))
    }
  }, [ref])

  return null
}

export default function AffiliateTracker() {
  return (
    <Suspense fallback={null}>
      <TrackerContent />
    </Suspense>
  )
}
