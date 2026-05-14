import fs from 'fs';
import path from 'path';

const initialProducts = [
  {
    title: "Solopreneur OS",
    value_prop: "The Central Command for Your One-Person Empire.",
    description: "The definitive command center for the modern solopreneur. Includes CRM, Project Management, Finance Tracker, Goal Setting, and a Resource Library. Designed for clarity and high-performance execution.",
    price: 97,
    type: "notion",
    features: [
      "Unified CRM for client management",
      "Integrated Project Hub",
      "Automated Finance Tracker",
      "Goal Setting & Vision Board",
      "Resource Library & Brain Dump"
    ],
    content_preview: {
      structure: ["Dashboard", "CRM", "Projects", "Finance", "Goals", "Library"],
      sample_content: "Welcome to Solopreneur OS. Start by setting your vision for the quarter..."
    },
    seo_metadata: {
      keywords: ["solopreneur", "notion template", "business management", "productivity"],
      meta_description: "Manage your entire one-person business in Notion with Solopreneur OS."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Stop paying for 5+ SaaS subscriptions. 🛑\n\nI built Solopreneur OS to be the only dashboard you need to run your business in Notion. CRM, Projects, Finance, and more. \n\nGet it here: [LINK]" },
        { platform: "X", content: "The secret to scaling as a solopreneur? Systems. ⚙️\n\nWithout them, you're just busy. With them, you're a business. \n\nSolopreneur OS is the system you've been waiting for. [LINK]" },
        { platform: "LinkedIn", content: "Running a one-person business shouldn't feel like a constant state of chaos. \n\nI've consolidated the best productivity frameworks into Solopreneur OS—a complete command center for your business. \n\nSay goodbye to app fatigue. [LINK]" }
      ],
      video_script: "HOOK: Are you tired of switching between 5 different apps just to manage your business? \n\nBODY: As a solopreneur, your time is your most valuable asset. That's why I built Solopreneur OS. It's a complete business engine inside Notion. \n\nYou get a CRM, a high-performance project hub, and an automated finance tracker all in one place. \n\nOUTRO: Stop the chaos and start scaling. Link in bio."
    }
  },
  {
    title: "AI Marketing Power-Pack",
    value_prop: "10x your content output with professionally engineered prompts.",
    description: "A collection of 500+ tested prompts for GPT-4, Claude, and Midjourney. Covers social media hooks, long-form SEO articles, email sequences, and high-conversion ad copy.",
    price: 49,
    type: "prompts",
    features: [
      "500+ Tested AI Prompts",
      "Viral Social Media Hooks",
      "SEO Article Architect",
      "High-Conversion Ad Copy",
      "Email Sequence Suite"
    ],
    content_preview: {
      structure: ["Twitter Hooks", "LinkedIn Articles", "Midjourney Prompts", "Sales Emails"],
      sample_content: "Prompt: [Act as a world-class copywriter...] Output: Your viral hook is ready."
    },
    seo_metadata: {
      keywords: ["AI prompts", "marketing prompts", "ChatGPT", "content creation"],
      meta_description: "Unlock the power of AI with 500+ professionally engineered marketing prompts."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "90% of people use AI wrong. 🧠\n\nThe secret is in the prompt engineering. I spent 100+ hours testing prompts so you don't have to.\n\nThe AI Marketing Power-Pack is live. [LINK]" },
        { platform: "X", content: "Generate a month of content in an afternoon. ⚡️\n\nMy AI Marketing Power-Pack includes 500+ prompts that actually convert. \n\nCheck it out: [LINK]" },
        { platform: "LinkedIn", content: "AI is the ultimate leverage for marketers. But only if you know how to talk to it. \n\nWe've engineered a library of 500+ prompts to help you scale your content production without losing quality. \n\nRevolutionize your workflow: [LINK]" }
      ],
      video_script: "HOOK: Stop getting generic results from ChatGPT. \n\nBODY: If you want AI to write content that actually sells, you need better prompts. \n\nThe AI Marketing Power-Pack gives you 500+ battle-tested prompts for X, LinkedIn, and even Midjourney. \n\nIt's like having a senior marketing team in a single file. \n\nOUTRO: Get the power-pack today. Link in bio."
    }
  },
  {
    title: "ADHD Focus System",
    value_prop: "Productivity That Respects Your Brain.",
    description: "Developed with neurodivergent productivity principles. Minimalist design, visual task management, and 'dopamine-reward' trackers to help maintain focus and reduce overwhelm.",
    price: 67,
    type: "notion",
    features: [
      "Visual Task Management",
      "Brain Dump Terminal",
      "Energy-Level Tracking",
      "Dopamine-Reward Systems",
      "Minimalist, low-friction design"
    ],
    content_preview: {
      structure: ["Morning Routine", "Focus Mode", "Brain Dump", "Weekly Review"],
      sample_content: "Energy level: Low. Suggesting: 5-minute 'Quick Wins' task list."
    },
    seo_metadata: {
      keywords: ["ADHD productivity", "neurodivergent", "notion template", "focus system"],
      meta_description: "A Notion productivity system designed specifically for ADHD brains."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Most productivity tools are built for boring brains. 🧠\n\nI built the ADHD Focus System for the rest of us. Visual, dopamine-friendly, and zero friction.\n\nFinally, a system that works with you. [LINK]" },
        { platform: "X", content: "Stop fighting your brain. 🛡️\n\nThe ADHD Focus System uses neurodivergent principles to help you stay on track without the burnout.\n\nCheck it out: [LINK]" },
        { platform: "LinkedIn", content: "Neurodiversity is a superpower, but standard productivity tools often fail us. \n\nWe designed the ADHD Focus System to lean into how neurodivergent brains actually work—prioritizing visual cues and dopamine rewards. \n\nReclaim your focus: [LINK]" }
      ],
      video_script: "HOOK: Does your to-do list feel like a nightmare? \n\nBODY: If you have ADHD, traditional productivity systems can be overwhelming. \n\nThat's why I built the ADHD Focus System. It's minimalist, it's visual, and it's designed to give your brain the dopamine hits it needs to stay focused. \n\nCapture ideas in the 'Brain Dump' and work in 'Focus Mode' without the noise. \n\nOUTRO: Stop the overwhelm. Link in bio."
    }
  },
  {
    title: "AI Agency Starter Kit",
    value_prop: "Start an AI automation agency in a weekend.",
    description: "Includes outreach scripts, service agreement templates, 5 core AI automation workflows, and a pricing calculator for AI services.",
    price: 197,
    type: "bundle",
    features: [
      "Cold Outreach Scripts",
      "Legal Service Agreements",
      "5 Core Automation Blueprints",
      "AI Service Pricing Calculator",
      "Client Onboarding Framework"
    ],
    content_preview: {
      structure: ["Outreach Folder", "Contracts Folder", "Workflows ZIP", "Calculator.xlsx"],
      sample_content: "Cold Email Subject: [Company Name] + AI Automation potential"
    },
    seo_metadata: {
      keywords: ["AI agency", "automation business", "starter kit", "agency templates"],
      meta_description: "The complete toolkit to launch and scale your own AI automation agency."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "The AI Agency gold rush is here. ⛏️\n\nDon't waste months figuring out the ops. I put everything I know into the AI Agency Starter Kit.\n\nLaunch this weekend: [LINK]" },
        { platform: "X", content: "Sell systems, not hours. ⏳\n\nAI automation is the highest-leverage service you can offer in 2024. \n\nEverything you need to start is right here: [LINK]" },
        { platform: "LinkedIn", content: "Businesses are desperate for AI integration but don't know where to start. \n\nThat's your opportunity. Our AI Agency Starter Kit provides the contracts, scripts, and workflows to turn you into an automation expert overnight. \n\nBuild a future-proof business: [LINK]" }
      ],
      video_script: "HOOK: AI automation is the biggest business opportunity of the decade. \n\nBODY: But starting an agency from scratch is hard. \n\nThe AI Agency Starter Kit gives you the shortcut. \n\nYou get proven outreach scripts, legal contracts, and the actual automation blueprints we use for clients. \n\nOUTRO: Stop dreaming and start building. Link in bio."
    }
  },
  {
    title: "Ultimate Content Creator Hub",
    value_prop: "Streamline your content workflow from idea to distribution.",
    description: "A multi-channel content calendar and production tracker. Includes templates for scripts, research databases, and performance analytics across TikTok, YouTube, and X.",
    price: 77,
    type: "notion",
    features: [
      "Multi-Channel Content Calendar",
      "Script & Storyboard Templates",
      "Sponsorship Tracker",
      "Research & Idea Database",
      "Performance Analytics Dashboard"
    ],
    content_preview: {
      structure: ["Calendar View", "Script Library", "Sponsors", "Analytics"],
      sample_content: "New Video Idea: 'How I automated my entire life with AI'..."
    },
    seo_metadata: {
      keywords: ["content creator", "notion template", "youtube tracker", "content calendar"],
      meta_description: "The ultimate Notion system for YouTubers, TikTokers, and creators."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Being a creator is 90% admin, 10% creating. 🎥\n\nI'm flipping that. The Ultimate Content Creator Hub handles the ops so you can focus on the art.\n\nStreamline your workflow: [LINK]" },
        { platform: "X", content: "One calendar to rule them all. 📅\n\nManage YouTube, TikTok, and X in one integrated dashboard. \n\nCheck out the Creator Hub: [LINK]" },
        { platform: "LinkedIn", content: "Consistency is the only 'secret' to content success. \n\nBut consistency requires a system. Our Creator Hub is the same system used by top-tier creators to stay organized and productive across multiple platforms. \n\nLevel up your production: [LINK]" }
      ],
      video_script: "HOOK: Stop letting your best content ideas die in your notes app. \n\nBODY: As a creator, you need a central hub. \n\nThis Notion system tracks your ideas, stores your scripts, manages your sponsorships, and even analyzes your performance. \n\nWhether you're on YouTube, TikTok, or X, this is your new home base. \n\nOUTRO: Become a more consistent creator. Link in bio."
    }
  },
  {
    title: "Biohacker’s Performance Journal",
    value_prop: "Optimize your human hardware through data-driven tracking.",
    description: "Hyper-detailed tracking for sleep cycles, nutrition, supplement stacks, and workout performance. Includes monthly review sections and habit formation trackers.",
    price: 29,
    type: "guide",
    features: [
      "Sleep & Circadian Tracking",
      "Nutrient Density Logs",
      "Supplement Stack Optimizer",
      "Biometric Performance Hub",
      "Monthly Growth Reviews"
    ],
    content_preview: {
      structure: ["Daily Log", "Monthly Analysis", "Stack Guide"],
      sample_content: "AM Protocol: Sunlight exposure, 500ml water, 200mg L-Theanine..."
    },
    seo_metadata: {
      keywords: ["biohacking", "performance journal", "health tracker", "optimization"],
      meta_description: "Track and optimize your health and performance with our Biohacker's Journal."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "What gets measured gets managed. 🧬\n\nIf you're not tracking your biometrics, you're just guessing. My Biohacker’s Journal is the ultimate tool for human optimization.\n\nOptimize your life: [LINK]" },
        { platform: "X", content: "Upgrade your human OS. 💻\n\nTrack sleep, nutrition, and supplements with scientific precision. \n\nGet the Journal: [LINK]" },
        { platform: "LinkedIn", content: "Peak performance in business starts with peak performance in the body. \n\nI've developed a data-driven framework for tracking health biometrics that aligns with high-performance professional goals. \n\nMaster your hardware: [LINK]" }
      ],
      video_script: "HOOK: You are a high-performance machine. Start acting like one. \n\nBODY: If you want to perform at your best, you need to track the data. \n\nThe Biohacker’s Performance Journal helps you monitor your sleep, your nutrition, and your supplement stacks to see exactly what drives your results. \n\nStop guessing and start optimizing. \n\nOUTRO: Upgrade yourself. Link in bio."
    }
  },
  {
    title: "Zero-to-One Automation Blueprints",
    value_prop: "Stop doing repetitive tasks manually.",
    description: "10 pre-built Make.com and Zapier blueprints for common tasks like lead capture to CRM, automatic social posting, and invoice generation. Includes setup videos.",
    price: 127,
    type: "bundle",
    features: [
      "10 Importable Make.com Blueprints",
      "Zapier Automation Templates",
      "Step-by-Step Setup Videos",
      "Error-Handling Frameworks",
      "API Connection Guide"
    ],
    content_preview: {
      structure: ["Blueprints Folder", "Video Guides Folder", "PDF Manual"],
      sample_content: "Import the 'Lead-to-CRM.json' file into Make.com to instantly sync your leads."
    },
    seo_metadata: {
      keywords: ["automation blueprints", "Make.com", "Zapier templates", "business automation"],
      meta_description: "Automate your business in minutes with 10 pre-built automation blueprints."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Repetitive tasks are the enemy of growth. ⚔️\n\nI'm giving you my top 10 automation blueprints for Make and Zapier. Import and play.\n\nBuy back your time: [LINK]" },
        { platform: "X", content: "Hire a robot for $0. 🤖\n\nThese 10 automations handle the boring stuff so you can do the high-value work. \n\nCheck them out: [LINK]" },
        { platform: "LinkedIn", content: "Automation isn't just for tech giants anymore. \n\nSmall businesses can now leverage the same efficiency using tools like Make and Zapier. Our blueprints provide the 'how-to' without the learning curve. \n\nScale without the stress: [LINK]" }
      ],
      video_script: "HOOK: Stop wasting hours on boring admin tasks. \n\nBODY: I've built 10 automation blueprints that you can literally just 'copy and paste' into your business. \n\nFrom syncing leads to your CRM to automatically posting your content—these are the same workflows I use every day. \n\nNo coding required. \n\nOUTRO: Buy back your time. Link in bio."
    }
  },
  {
    title: "The Digital Asset Playbook",
    value_prop: "Master the art of building and flipping digital real estate.",
    description: "A comprehensive guide on identifying niche markets, building value-driven digital products, and scaling to your first $10k month in passive income.",
    price: 97,
    type: "guide",
    features: [
      "Niche Identification Framework",
      "Product Design Principles",
      "Viral Launch Strategy",
      "Scaling & Funnel Optimization",
      "Case Studies of $10k/mo Assets"
    ],
    content_preview: {
      structure: ["Part 1: The Mindset", "Part 2: The Forge", "Part 3: The Scale"],
      sample_content: "The goal isn't a product. The goal is an asset that yields cashflow."
    },
    seo_metadata: {
      keywords: ["digital assets", "passive income", "product launch", "online business"],
      meta_description: "Learn how to build, launch, and scale high-margin digital assets."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Digital products are the ultimate leverage. 🏗️\n\nBuild once, sell forever. My Digital Asset Playbook shows you exactly how I do it.\n\nStart your empire: [LINK]" },
        { platform: "X", content: "$0 to $10k/mo with digital real estate. 🏰\n\nNo inventory, no shipping, no limits. \n\nThe Playbook is live: [LINK]" },
        { platform: "LinkedIn", content: "The transition from 'service provider' to 'asset owner' is the most significant leap you can make in your career. \n\nDigital assets allow you to decouple your income from your hours. Our Playbook provides the roadmap for that transition. \n\nOwn your future: [LINK]" }
      ],
      video_script: "HOOK: Stop trading your time for money. \n\nBODY: Digital assets are the ultimate wealth-building tool. \n\nYou build them once, and they work for you 24/7. \n\nThe Digital Asset Playbook is a step-by-step guide on how to find a niche, build a product people actually want, and scale it to $10k a month. \n\nOUTRO: Start building your empire. Link in bio."
    }
  },
  {
    title: "Minimalist Finance Tracker",
    value_prop: "Effortless wealth management for the modern era.",
    description: "Clean, intuitive finance management. Track net worth, monthly expenses, investment portfolios, and savings goals without the complexity of traditional spreadsheets.",
    price: 37,
    type: "notion",
    features: [
      "Net Worth Dashboard",
      "Automated Monthly Expense Logs",
      "Investment Portfolio Tracker",
      "Savings & Goal Progress",
      "Subscription Audit Tool"
    ],
    content_preview: {
      structure: ["Overview", "Transactions", "Investments", "Goals"],
      sample_content: "Current Net Worth: $XX,XXX. Monthly Savings Rate: 25%."
    },
    seo_metadata: {
      keywords: ["finance tracker", "notion template", "wealth management", "budgeting"],
      meta_description: "A minimalist, powerful Notion template for tracking your wealth."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Most finance trackers are too complicated. 📈\n\nI made this one for people who actually want to use it. Minimalist, powerful, and clean.\n\nMaster your money: [LINK]" },
        { platform: "X", content: "Track your net worth in 5 minutes a month. 💰\n\nComplexity is the enemy of consistency. Go minimalist.\n\nGet the tracker: [LINK]" },
        { platform: "LinkedIn", content: "Financial clarity is a prerequisite for professional success. \n\nWe built a minimalist framework in Notion to help you monitor your net worth and cash flow without the friction of complex spreadsheets. \n\nTake control of your finances: [LINK]" }
      ],
      video_script: "HOOK: Is your financial tracking a mess of spreadsheets? \n\nBODY: You don't need complex formulas to manage your wealth. \n\nYou need clarity. \n\nThe Minimalist Finance Tracker is a clean, intuitive Notion template that gives you a high-level view of your net worth, your expenses, and your goals. \n\nOUTRO: Get financial clarity. Link in bio."
    }
  },
  {
    title: "SaaS Launch Checklist & UI Kit",
    value_prop: "Cut your development time in half.",
    description: "A comprehensive checklist for launching a SaaS product plus a library of high-conversion Tailwind CSS components and a Figma UI kit for rapid prototyping.",
    price: 97,
    type: "bundle",
    features: [
      "100+ Step Launch Checklist",
      "High-Conversion Tailwind UI Kit",
      "Figma Prototyping Files",
      "Marketing & Pre-launch Assets",
      "Post-launch Scale Guide"
    ],
    content_preview: {
      structure: ["Checklist PDF", "Tailwind Code ZIP", "Figma Link"],
      sample_content: "Step 1: Validate niche. Step 2: Build MVP components..."
    },
    seo_metadata: {
      keywords: ["SaaS launch", "UI kit", "Tailwind CSS", "Figma templates"],
      meta_description: "The ultimate toolkit for launching your SaaS product faster."
    },
    marketing: {
      social_posts: [
        { platform: "X", content: "Shipping is a feature. 🚀\n\nDon't let perfectionism kill your SaaS. Use our launch kit and UI library to get live in half the time.\n\nLaunch faster: [LINK]" },
        { platform: "X", content: "Your SaaS MVP deserves a pro look. 💎\n\nTailwind components + a 100-step checklist. \n\nGet the Launch Kit: [LINK]" },
        { platform: "LinkedIn", content: "The biggest risk for any SaaS founder is time to market. \n\nOur Launch Checklist and UI Kit are designed to remove the friction of the 'boring stuff' so you can focus on your core product innovation. \n\nShip with confidence: [LINK]" }
      ],
      video_script: "HOOK: Most SaaS products never launch because founders get stuck in the weeds. \n\nBODY: Don't be that founder. \n\nOur SaaS Launch Kit gives you a 100-step roadmap to go from idea to live, plus a library of professional Tailwind components so you don't have to design from scratch. \n\nOUTRO: Start shipping today. Link in bio."
    }
  }
];

// Write products to JSON
fs.writeFileSync('/home/team/shared/initial-products.json', JSON.stringify(initialProducts, null, 2));

// Prepare and write marketing pack
const marketingPackPath = '/home/team/shared/marketing-pack';
if (!fs.existsSync(marketingPackPath)) {
  fs.mkdirSync(marketingPackPath, { recursive: true });
}

initialProducts.forEach(product => {
  const productSlug = product.title.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
  const productMarketingPath = path.join(marketingPackPath, productSlug);
  if (!fs.existsSync(productMarketingPath)) {
    fs.mkdirSync(productMarketingPath, { recursive: true });
  }

  let marketingContent = `# Marketing Assets for ${product.title}\n\n`;
  marketingContent += `## Social Media Posts\n\n`;
  product.marketing.social_posts.forEach((post, index) => {
    marketingContent += `### ${post.platform} Post ${index + 1}\n${post.content}\n\n`;
  });

  marketingContent += `## Short-Form Video Script\n\n${product.marketing.video_script}\n`;

  fs.writeFileSync(path.join(productMarketingPath, 'assets.md'), marketingContent);
});

console.log('Initial products and marketing pack generated successfully!');
