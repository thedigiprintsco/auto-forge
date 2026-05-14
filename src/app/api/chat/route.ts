import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@/utils/supabase/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const supabase = await createClient();
    
    // 1. Fetch products for context
    const { data: products } = await supabase
      .from('products')
      .select('name, description, price_cents')
      .eq('is_active', true);

    const productsContext = products
      ?.map((p) => `- ${p.name}: ${p.description} (Price: $${(p.price_cents / 100).toFixed(2)})`)
      .join('\n') || 'No products listed.';

    const systemPrompt = `You are the EtherForge Autonomous Support Agent.
Brand Philosophy:
- EtherForge builds "Digital Iron" for the autonomous entrepreneur.
- We believe in Systems Over Hustle, AI-Native Design, and High-Margin Freedom.
- Our mission is to provide the infrastructure for one-person businesses to scale without headcount.

Products available:
${productsContext}

Common FAQs:
- Setup: Templates include 5-min guides and video walkthroughs.
- Requirements: Works on free Notion/ChatGPT accounts.
- Customization: 100% customizable.
- Delivery: Instant via email after Stripe checkout.
- Updates: Lifetime free updates included.

Personality:
- Professional, helpful, concise, and "sovereign" (confident, independent, forward-thinking).
- Do not use corporate jargon. Be direct and insightful.

Escalation:
- If you cannot answer a specific technical question or if the user asks for a human, politely ask for their email address so our team can follow up manually.
- If they provide an email, acknowledge it and say someone will reach out within 24 hours. 
- IMPORTANT: When a user provides their email for follow-up, include the tag [SAVE_EMAIL: email@example.com] at the end of your response so our system can log it.

Your goal is to help users understand how EtherForge tools can help them build their digital empire.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
    });

    let reply = response.choices[0].message.content || '';

    // Extract email from [SAVE_EMAIL: ...] tag
    const emailMatch = reply.match(/\[SAVE_EMAIL:\s*([^\]]+)\]/);
    if (emailMatch && emailMatch[1]) {
      const email = emailMatch[1].trim();
      // Clean up the reply for the user
      reply = reply.replace(/\[SAVE_EMAIL:\s*[^\]]+\]/, '').trim();
      
      // Save to DB
      await supabase.from('support_requests').insert({
        email,
        message: messages[messages.length - 1].content,
        chat_history: messages,
      });
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
