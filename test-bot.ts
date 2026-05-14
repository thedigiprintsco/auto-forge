import { ForgeBot } from './src/lib/forge-bot';

async function test() {
  const bot = new ForgeBot();
  const result = await bot.runCycle();
  console.log('Test Result:', JSON.stringify(result, null, 2));
}

test().catch(console.error);
