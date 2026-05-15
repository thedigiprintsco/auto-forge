'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function AffiliateSignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [referralCode, setReferralCode] = useState('')
  
  const supabase = createClient()
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/auth/login?returnTo=/affiliate/signup')
        return
      }

      // Generate a referral code if not provided
      const code = referralCode || Math.random().toString(36).substring(2, 8).toUpperCase()

      // Ensure customer record exists for the join in admin view
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('id', user.id)
        .single()
      
      if (!customer) {
        await supabase.from('customers').insert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || 'Affiliate User'
        })
      }

      const { error: signupError } = await supabase
        .from('affiliates')
        .insert({
          user_id: user.id,
          referral_code: code,
          status: 'pending' // Admin needs to approve
        })

      if (signupError) {
        if (signupError.code === '23505') {
          setError('This referral code is already taken. Please try another one.')
        } else {
          setError(signupError.message)
        }
      } else {
        setSuccess(true)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-deep-space text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-forge-gray/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-ai-teal/20 p-3">
              <CheckCircle2 className="h-12 w-12 text-ai-teal" />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-display mb-4">Application Submitted!</h1>
          <p className="text-silver-slate mb-8">
            Thank you for applying to the EtherForge Affiliate Program. Our team will review your application and notify you once it is approved.
          </p>
          <Button onClick={() => router.push('/')} className="w-full">
            Return to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-deep-space text-white flex items-center justify-center p-4 py-20">
      <div className="max-w-xl w-full bg-forge-gray/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold font-display mb-4 text-gradient">Join the Forge</h1>
          <p className="text-lg text-silver-slate">
            Earn 20% commission on every sale you refer to EtherForge. Help solopreneurs achieve autonomy while building your own wealth.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="referralCode">Desired Referral Code (Optional)</Label>
            <Input 
              id="referralCode"
              placeholder="e.g. WEALTHFORGE"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
              className="bg-black/50 border-white/10"
            />
            <p className="text-xs text-zinc-500">
              Leave blank to auto-generate. Only alphanumeric characters allowed.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-ai-teal/5 border border-ai-teal/10 text-sm text-silver-slate">
            <h3 className="font-bold text-white mb-2">Program Details:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>20% commission on all digital product sales.</li>
              <li>30-day cookie window.</li>
              <li>Monthly payouts via PayPal or Stripe.</li>
              <li>Access to premium marketing assets.</li>
            </ul>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-6 text-lg font-bold shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
            Apply to Affiliate Program
          </Button>
        </form>
      </div>
    </div>
  )
}
