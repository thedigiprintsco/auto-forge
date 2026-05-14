const { ForgeBot } = require('./src/lib/forge-bot');

async function test() {
  const bot = new ForgeBot();
  const result = await bot.runCycle();
  console.log('Test Result:', result);
}

test();
