# Setup Supabase for Production (Vercel Compatible)

## Why Supabase?

- ✅ Free tier with plenty of storage
- ✅ Works perfectly with Vercel
- ✅ PostgreSQL database (reliable, scalable)
- ✅ Real-time updates
- ✅ File storage for images
- ✅ Easy to setup

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Sign Up"
3. Create account with email
4. Verify email
5. Create new organization and project

## Step 2: Get Your Connection Details

1. In Supabase dashboard, go to **Settings > Database**
2. Copy these values (you'll need them):
   - **Connection String** (PostgreSQL)
   - **Project URL**
   - **Anon Key** (public key)
   - **Service Role Key** (private key)

## Step 3: Create Database Tables

In Supabase SQL Editor, run this:

```sql
-- Products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category VARCHAR(50) NOT NULL,
  image VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  rating DECIMAL(3, 2) DEFAULT 5,
  reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product variants table
CREATE TABLE product_variants (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size VARCHAR(10),
  color VARCHAR(50),
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_variants_product ON product_variants(product_id);
```

## Step 4: Environment Variables

Create `.env.local` in your project root:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 5: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

## Step 6: Update API Routes

Replace the JSON file logic with Supabase queries in:
- `/api/products/route.ts` (GET, POST)
- `/api/products/[id]/route.ts` (GET, PUT, DELETE)
- `/api/upload/route.ts` (image upload)

## Step 7: Seed Initial Data

In Supabase SQL Editor, insert your 12 products:

```sql
INSERT INTO products (name, description, price, category, image, featured, rating, reviews)
VALUES 
  ('Navy Blue Joggers', 'Sleek navy joggers...', 48.99, 'joggers', '/products/joggers-navy.jpg', true, 4.7, 98),
  -- ... (all 12 products)
```

## Step 8: Deploy to Vercel

1. Add `.env.local` secrets to Vercel project settings
2. Redeploy
3. Test delete/upload on live site

## Testing Checklist

- [ ] Login works on Vercel
- [ ] Add product works
- [ ] Image upload works
- [ ] Product appears on homepage
- [ ] Delete product works
- [ ] All pages load correctly

---

**This guide will be implemented in the next step!**
