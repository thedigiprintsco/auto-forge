-- Add missing columns to orders table for abandoned cart tracking and affiliates
ALTER TABLE orders ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS affiliate_id UUID;

-- Optional: Add index for affiliate performance tracking
CREATE INDEX IF NOT EXISTS idx_orders_affiliate_id ON orders(affiliate_id);
