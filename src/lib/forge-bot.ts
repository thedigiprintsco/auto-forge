export async function generateSocialPost(product: { title: string, value_prop: string }): Promise<string> {
  const apiKey = process.env.CLAUDE_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn('AI API key missing for Forge Bot, using mock post generation.');
    return mockGenerateSocialPost(product);
  }

  // Real LLM call would go here
  // For now, return mock
  return mockGenerateSocialPost(product);
}

function mockGenerateSocialPost(product: { title: string, value_prop: string }): string {
  const hooks = [
    "The future of work is here. 🚀",
    "Stop trading time for money. ⚙️",
    "Automation is the new gold rush. ⛏️",
    "Build your empire while you sleep. 🏰"
  ];
  const hook = hooks[Math.floor(Math.random() * hooks.length)];

  return `${hook}\n\nOur '${product.title}' is designed to give you total autonomy. \n\nValue: ${product.value_prop}\n\nGet started at EtherForge. [LINK] #EtherForge #Autonomy #AI`;
}
