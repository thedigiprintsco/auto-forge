import { NextResponse } from 'next/server';
import { ForgeBot } from '@/lib/forge-bot';

/**
 * API Route to trigger the Forge Bot autonomous cycle.
 * This can be called by a Vercel Cron job or a manual trigger.
 */
export async function GET(request: Request) {
  // Simple check for Cron secret to prevent unauthorized triggers
  const { searchParams } = new URL(request.url);
  const authHeader = request.headers.get('authorization');
  
  // In production, set CRON_SECRET in Vercel environment variables
  const expectedSecret = process.env.CRON_SECRET || 'forge-bot-secret-123';
  
  if (authHeader !== `Bearer ${expectedSecret}` && searchParams.get('secret') !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bot = new ForgeBot();
    const result = await bot.runCycle();
    
    return NextResponse.json({
      status: 'success',
      data: result
    });
  } catch (error: any) {
    console.error('Forge Bot Trigger Error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message
    }, { status: 500 });
  }
}

/**
 * Support POST requests as well.
 */
export async function POST(request: Request) {
  return GET(request);
}
