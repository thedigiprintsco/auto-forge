import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { referralCode, url, referrer } = await req.json()
    
    if (!referralCode) {
      return NextResponse.json({ error: 'Missing referral code' }, { status: 400 })
    }

    const supabase = await createClient()

    // 1. Find the affiliate by referral code
    const { data: affiliate, error: affiliateError } = await supabase
      .from('affiliates')
      .select('id')
      .eq('referral_code', referralCode)
      .eq('status', 'active')
      .single()

    if (affiliateError || !affiliate) {
      // We don't log clicks for invalid or inactive affiliates
      return NextResponse.json({ success: false, message: 'Invalid affiliate code' })
    }

    // 2. Log the click
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = req.headers.get('user-agent') || 'unknown'

    const { error: logError } = await supabase
      .from('referral_clicks')
      .insert({
        affiliate_id: affiliate.id,
        ip_address: ipAddress,
        user_agent: userAgent,
        referrer: referrer || 'direct'
      })

    if (logError) {
      console.error('Error logging referral click:', logError)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Unexpected error in track-click:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
