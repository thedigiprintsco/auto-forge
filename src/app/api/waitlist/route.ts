import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendWelcomeEmail } from '@/lib/resend';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Insert into waitlist
    const { error: insertError } = await supabase
      .from('waitlist')
      .insert([{ email }])
      .select();

    // Note: If the email already exists, we might get an error depending on unique constraints.
    // For a waitlist, we can usually ignore unique constraint violations and just treat it as success.
    if (insertError && insertError.code !== '23505') {
      console.error('Waitlist insertion error:', insertError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    // 2. Trigger welcome email
    await sendWelcomeEmail({ to: email });

    return NextResponse.json({ success: true, message: 'Successfully joined the waitlist' });
  } catch (error: unknown) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}
