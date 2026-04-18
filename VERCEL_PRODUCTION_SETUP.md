# 🚀 Vercel Production Setup - Delete & Upload Fix

## Problem Identified ❌

Your Vercel live site can't delete or upload products because:
- Vercel's filesystem is **read-only** for serverless functions
- You can't write to `public/` folder on Vercel
- Need **cloud database** instead of JSON files

## Solution ✅

Switch to **Supabase** (free PostgreSQL) for:
- ✅ Working delete on Vercel
- ✅ Working uploads on Vercel
- ✅ Persistent database
- ✅ Real-time updates
- ✅ Free tier generously sized

---

## Setup Instructions (5 minutes)

### Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click **"Start your project"**
3. Sign up with email (or GitHub)
4. Verify email
5. Create new organization
6. Create new project (name: `funmiano-couture`, region: closest to you, password: something secure)
7. Wait for project to initialize (2-3 minutes)

### Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Settings > Database** (left sidebar)
2. Under "Connection string" section, copy:
   - **URI** - starts with `postgresql://`
   - Keep this safe!

3. Go to **Settings > API** (left sidebar)
4. Copy these values:
   - **Project URL** - starts with `https://`
   - **anon public** - under API Keys
   - **service_role secret** - under API Keys (click show first)

Save these 3 values!

### Step 3: Create Database Tables

1. In left sidebar, click **SQL Editor**
2. Click **"New Query"**
3. Paste this code and click **Run**:

```sql
-- Products table
CREATE TABLE products (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
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

✅ You should see "Success" message

### Step 4: Seed Initial Data

Create another **New Query** and paste (update the image paths):

```sql
INSERT INTO products (name, description, price, category, image, featured, rating, reviews) VALUES
('Navy Blue Joggers', 'Sleek navy joggers with modern design. Perfect for athletic and casual occasions.', 48.99, 'joggers', '/products/joggers-navy.jpg', true, 4.7, 98),
('Grey Melange Joggers', 'Elegant grey melange joggers with a contemporary fit. Versatile for all seasons.', 49.99, 'joggers', '/products/joggers-grey.jpg', true, 4.6, 87),
('Black Classic Joggers', 'Timeless black joggers that pair well with any outfit. A wardrobe essential.', 47.99, 'joggers', '/products/joggers-black.jpg', true, 4.8, 125),
('Navy Sweatshirt', 'Cozy navy sweatshirt perfect for cold days and layering in style.', 59.99, 'sweatshirts', '/products/sweatshirts-navy.jpg', true, 4.9, 145),
('Grey Sweatshirt', 'Soft grey sweatshirt with a modern fit for maximum comfort.', 59.99, 'sweatshirts', '/products/sweatshirts-grey.jpg', true, 4.7, 98),
('Black Sweatshirt', 'Classic black sweatshirt that never goes out of style.', 59.99, 'sweatshirts', '/products/sweatshirts-black.jpg', true, 4.8, 112),
('Pink Kids Dress', 'Adorable pink dress perfect for little girls. Comfortable and stylish.', 34.99, 'kids-dresses', '/products/kids-pink.jpg', true, 5.0, 234),
('Purple Kids Dress', 'Vibrant purple dress that will make your daughter smile.', 34.99, 'kids-dresses', '/products/kids-purple.jpg', true, 4.9, 187),
('Blue Adult Dress', 'Elegant blue dress for women. Perfect for casual or formal occasions.', 79.99, 'adult-dresses', '/products/dress-blue.jpg', true, 4.8, 156),
('Black Adult Dress', 'Sophisticated black dress that flatters all body types.', 79.99, 'adult-dresses', '/products/dress-black.jpg', true, 4.9, 198),
('Red Adult Dress', 'Stunning red dress that turns heads and makes a statement.', 89.99, 'adult-dresses', '/products/dress-red.jpg', true, 5.0, 267),
('funmiano classic', 'Our premium merch.', 39.89, 'sweatshirts', '/products/product-1775739930522-zca38q.png', true, 5.0, 0);

-- Insert variants for each product
INSERT INTO product_variants (product_id, size, color, stock) VALUES
(1, 'XS', 'Navy', 12), (1, 'S', 'Navy', 18), (1, 'M', 'Navy', 22), (1, 'L', 'Navy', 16), (1, 'XL', 'Navy', 10), (1, 'XXL', 'Navy', 8),
(2, 'XS', 'Grey', 10), (2, 'S', 'Grey', 15), (2, 'M', 'Grey', 20), (2, 'L', 'Grey', 14), (2, 'XL', 'Grey', 9), (2, 'XXL', 'Grey', 6),
(3, 'XS', 'Black', 14), (3, 'S', 'Black', 19), (3, 'M', 'Black', 25), (3, 'L', 'Black', 18), (3, 'XL', 'Black', 12), (3, 'XXL', 'Black', 9),
(4, 'XS', 'Navy', 8), (4, 'S', 'Navy', 12), (4, 'M', 'Navy', 16), (4, 'L', 'Navy', 14), (4, 'XL', 'Navy', 10), (4, 'XXL', 'Navy', 7),
(5, 'XS', 'Grey', 9), (5, 'S', 'Grey', 13), (5, 'M', 'Grey', 17), (5, 'L', 'Grey', 15), (5, 'XL', 'Grey', 11), (5, 'XXL', 'Grey', 8),
(6, 'XS', 'Black', 11), (6, 'S', 'Black', 15), (6, 'M', 'Black', 19), (6, 'L', 'Black', 17), (6, 'XL', 'Black', 13), (6, 'XXL', 'Black', 10),
(7, '2T', 'Pink', 20), (7, '3T', 'Pink', 22), (7, '4T', 'Pink', 18), (7, '5T', 'Pink', 16), (7, '6T', 'Pink', 14),
(8, '2T', 'Purple', 18), (8, '3T', 'Purple', 20), (8, '4T', 'Purple', 17), (8, '5T', 'Purple', 15), (8, '6T', 'Purple', 13),
(9, 'XS', 'Blue', 6), (9, 'S', 'Blue', 9), (9, 'M', 'Blue', 12), (9, 'L', 'Blue', 10), (9, 'XL', 'Blue', 7),
(10, 'XS', 'Black', 8), (10, 'S', 'Black', 11), (10, 'M', 'Black', 14), (10, 'L', 'Black', 12), (10, 'XL', 'Black', 9),
(11, 'XS', 'Red', 5), (11, 'S', 'Red', 8), (11, 'M', 'Red', 11), (11, 'L', 'Red', 9), (11, 'XL', 'Red', 6),
(12, 'M', 'black', 100);
```

✅ All products inserted!

### Step 5: Create `.env.local` File

In your project root, create `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-name.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace the values from Step 2!

### Step 6: Update API Routes

**I will now update the API routes to use Supabase instead of JSON files.**

This will make delete/upload work on Vercel!

---

## What's Next?

Once you provide your Supabase credentials from Step 2, I will:

1. ✅ Update `/api/products/route.ts` 
2. ✅ Update `/api/products/[id]/route.ts`
3. ✅ Update `/api/upload/route.ts`
4. ✅ Test locally
5. ✅ Deploy to Vercel
6. ✅ Verify delete works on live site

**Ready? Share your Supabase credentials and we'll finish this!** 🚀
