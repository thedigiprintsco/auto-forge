-- Seed Categories
INSERT INTO categories (name, slug) VALUES
('Notion Templates', 'notion-templates'),
('AI Prompts', 'ai-prompts'),
('Automation', 'automation'),
('Guides', 'guides'),
('Bundles', 'bundles');

-- Seed Products
DO $$
DECLARE
  notion_id UUID;
  prompts_id UUID;
  automation_id UUID;
  guides_id UUID;
  bundles_id UUID;
BEGIN
  SELECT id INTO notion_id FROM categories WHERE slug = 'notion-templates';
  SELECT id INTO prompts_id FROM categories WHERE slug = 'ai-prompts';
  SELECT id INTO automation_id FROM categories WHERE slug = 'automation';
  SELECT id INTO guides_id FROM categories WHERE slug = 'guides';
  SELECT id INTO bundles_id FROM categories WHERE slug = 'bundles';

  -- Core Bundles (Fixed IDs for Frontend Matching)
  INSERT INTO products (id, name, slug, description, price_cents, category_id, type, image_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Solopreneur OS', 'solopreneur-os', 'The definitive command center for the modern solopreneur. Includes CRM, Project Management, Finance Tracker, Goal Setting, and a Resource Library.', 9700, notion_id, 'notion', '/design/products/solopreneur-os.png'),
  ('550e8400-e29b-41d4-a716-446655440001', 'AI Marketing Power-Pack', 'ai-marketing-power-pack', 'A collection of 500+ tested prompts for GPT-4, Claude, and Midjourney. Covers social media hooks, long-form SEO articles, email sequences, and high-conversion ad copy.', 4900, prompts_id, 'prompts', '/design/products/ai-marketing.png'),
  ('550e8400-e29b-41d4-a716-446655440002', 'ADHD Focus System', 'adhd-focus-system', 'Developed with neurodivergent productivity principles. Minimalist design, visual task management, and "dopamine-reward" trackers to help maintain focus and reduce overwhelm.', 6700, notion_id, 'notion', '/design/products/adhd-focus.png');

  -- Additional Products
  INSERT INTO products (name, slug, description, price_cents, category_id, type, image_url) VALUES
  ('AI Agency Starter Kit', 'ai-agency-starter-kit', 'Includes outreach scripts, service agreement templates, 5 core AI automation workflows, and a pricing calculator for AI services.', 19700, bundles_id, 'bundle', '/design/products/ai-agency.png'),
  ('Ultimate Content Creator Hub', 'ultimate-content-creator-hub', 'A multi-channel content calendar and production tracker. Includes templates for scripts, research databases, and performance analytics across TikTok, YouTube, and X.', 7700, notion_id, 'notion', '/design/products/content-creator.png'),
  ('Biohacker’s Performance Journal', 'biohackers-performance-journal', 'Hyper-detailed tracking for sleep cycles, nutrition, supplement stacks, and workout performance. Includes monthly review sections and habit formation trackers.', 2900, guides_id, 'pdf', '/design/products/biohacker.png'),
  ('Zero-to-One Automation Blueprints', 'zero-to-one-automation-blueprints', '10 pre-built Make.com and Zapier blueprints for common tasks like lead capture to CRM, automatic social posting, and invoice generation.', 12700, automation_id, 'automation', '/design/products/automation-blueprints.png'),
  ('The Digital Asset Playbook', 'the-digital-asset-playbook', 'A comprehensive guide on identifying niche markets, building value-driven digital products, and scaling to your first $10k month in passive income.', 9700, guides_id, 'pdf', '/design/products/asset-playbook.png'),
  ('Minimalist Finance Tracker', 'minimalist-finance-tracker', 'Clean, intuitive finance management. Track net worth, monthly expenses, investment portfolios, and savings goals without the complexity of traditional spreadsheets.', 4700, notion_id, 'notion', '/design/products/finance-tracker.png'),
  ('SaaS Launch Checklist & UI Kit', 'saas-launch-checklist-ui-kit', 'A comprehensive checklist for launching a SaaS product plus a library of high-conversion Tailwind CSS components and a Figma UI kit for rapid prototyping.', 9700, bundles_id, 'bundle', '/design/products/saas-launch.png');
END $$;
