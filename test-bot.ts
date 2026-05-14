import { ForgeBot } from './src/lib/forge-bot';

async function test() {
  console.log('Starting First Autonomous Marketing Cycle...');
  const bot = new ForgeBot();
  try {
    const result = await bot.runCycle();
    console.log('Cycle completed successfully:');
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Cycle failed with error:', err);
  }
}

test().catch(console.error);
