# EtherForge: Systems Over Hustle

EtherForge is a fully autonomous digital products business built with Next.js 15, Tailwind CSS, Supabase, and Stripe. It specializes in high-margin digital assets like Notion templates, AI prompt packs, and automation blueprints.

## Core Features

- **Premium Landing Page**: A high-conversion, futuristic storefront for digital products.
- **Dynamic Catalog**: Automated product page generation from Supabase data.
- **Seamless Checkout**: Integrated Stripe Payments with instant digital delivery.
- **Admin Dashboard**: Pro-tool interface for monitoring sales, customers, and AI activity.
- **Forge Bot**: An autonomous marketing engine that generates and posts viral social media content.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database/Auth**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **AI Engine**: OpenAI (GPT-4o, DALL-E 3) & Anthropic (Claude 3.5 Sonnet)
- **Automation**: Vercel Cron Jobs

## Forge Bot (Marketing Automation)

The Forge Bot is the heart of EtherForge's autonomous growth strategy. It selects products from the catalog, generates viral-optimized marketing copy and visuals using AI, and manages social distribution.

### Configuration

To enable the Forge Bot, ensure the following environment variables are set:

- `OPENAI_API_KEY`: For GPT-4o copywriting and DALL-E 3 image generation.
- `ANTHROPIC_API_KEY`: (Optional) Fallback/Alternative for copywriting.
- `BUFFER_API_TOKEN`: For social media distribution (X, LinkedIn).
- `FORGE_BOT_SECRET`: Secret key for triggering the bot via API.

### Triggering the Bot

The bot is triggered daily via a Vercel Cron job at 10:00 AM UTC. It can also be triggered manually:

```bash
curl -X POST https://etherforge.ai/api/forge-bot/trigger \
  -H "Authorization: Bearer [FORGE_BOT_SECRET]"
```

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thedigiprintsco/auto-forge.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.example` to `.env.local` and fill in the required keys.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## License

Proprietary. Built by Team EtherForge.
