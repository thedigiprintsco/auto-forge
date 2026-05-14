-- Categories for products
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL, -- Price in cents
  category_id UUID REFERENCES categories(id),
  type TEXT NOT NULL, -- 'notion', 'pdf', 'prompts', 'bundle'
  image_url TEXT,
  download_url TEXT, -- URL or reference to storage
  slug TEXT NOT NULL UNIQUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table (linked to auth.users)
CREATE TABLE customers (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id),
  total_amount_cents INTEGER NOT NULL,
  stripe_checkout_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  price_cents INTEGER NOT NULL
);

-- Row Level Security (RLS)

-- Categories: Anyone can read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);

-- Products: Anyone can read active products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on active products" ON products FOR SELECT USING (is_active = true);

-- Customers: Users can only read/update their own profile
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to read their own profile" ON customers FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow users to update their own profile" ON customers FOR UPDATE USING (auth.uid() = id);

-- Orders: Users can only read their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to read their own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);

-- Order items: Users can only read items from their own orders
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow users to read their own order items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.customer_id = auth.uid()
  )
);

-- Functions for triggers
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert to waitlist" ON waitlist FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read waitlist" ON waitlist FOR SELECT USING (false); -- Admin only via service role
