# 🎀 Funmiano Couture Styles - E-Commerce App

A modern, fully-featured e-commerce platform for **Funmiano Couture Styles** - your premium ready-to-wear fashion brand.

## 🌟 Features

### 🏠 Homepage
- **Hero Section** - Eye-catching brand showcase with your flame/leaf logo
- **Category Overview** - Quick access to all product categories
- **Featured Products** - Highlight your best-selling items
- **Newsletter Signup** - Build your mailing list
- **Trust Badges** - Security, shipping, and support information

### 🛍️ Product Management
- **Product Catalog** - Browse all products with detailed information
- **Category Filtering** - Separate views for:
  - Joggers & Sweatshirts
  - Kids' Dresses
  - Adult Dresses
- **Advanced Sorting** - Sort by price, rating, or featured items
- **Product Detail Pages** - Full product specs with:
  - Multiple images
  - Size and color options
  - Stock availability
  - Customer ratings and reviews
  - Detailed descriptions

### 🛒 Shopping Cart
- **Persistent Cart** - Saves to localStorage (survives page refreshes)
- **Real-time Updates** - See cart count in header
- **Quantity Management** - Adjust quantities directly
- **Remove Items** - One-click item removal
- **Order Summary** - Clear pricing breakdown

### 💳 Secure Checkout
- **Customer Information** - Collect name, email, phone, shipping address
- **Payment Form** - Credit card input with validation
- **Form Validation** - Real-time error checking
- **Order Confirmation** - Success page with order ID and details
- **Security Features** - SSL encryption indicators

### 📱 Responsive Design
- **Mobile-First** - Perfect on phones, tablets, and desktops
- **Touch-Friendly** - Large buttons and easy navigation
- **Fast Loading** - Optimized performance with Next.js

### 🔒 Security & Best Practices
- **Input Validation** - Email, phone, and payment validation
- **Error Handling** - User-friendly error messages
- **Stock Management** - Prevents overselling
- **Secure State Management** - Cart context with proper React patterns

---

## 📦 Product Collections

### Joggers (3 items)
- Classic Black Joggers - $45.99 (was $59.99)
- Navy Blue Joggers - $48.99
- Grey Melange Joggers - $49.99

### Sweatshirts (3 items)
- Premium Black Sweatshirt - $54.99 (was $69.99)
- Charcoal Sweatshirt - $56.99
- Burgundy Sweatshirt - $57.99

### Kids' Dresses (3 items)
- Floral Kids Dress - $35.99 (was $45.99)
- Classic Navy Kids Dress - $38.99
- Elegant Pink Party Dress - $42.99

### Adult Dresses (3 items)
- Elegant Black Evening Dress - $89.99 (was $119.99)
- Casual Midi Dress - $64.99
- Burgundy Cocktail Dress - $79.99

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build the app
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
funmiano-couture-app/
├── public/
│   └── logo.svg                    # Your brand logo
├── src/
│   ├── app/
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Homepage
│   │   ├── cart/
│   │   │   └── page.tsx            # Shopping cart page
│   │   ├── products/
│   │   │   ├── page.tsx            # Products listing
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Product details
│   │   └── checkout/
│   │       └── page.tsx            # Checkout page
│   ├── components/
│   │   ├── Header.tsx              # Navigation header
│   │   ├── Footer.tsx              # Footer
│   │   └── ProductCard.tsx         # Product card component
│   ├── context/
│   │   └── CartContext.tsx         # Shopping cart state
│   ├── constants/
│   │   └── products.ts             # Product data
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── utils/
│       ├── formatting.ts           # Format utilities (currency, dates)
│       └── validation.ts           # Form validation
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 🎨 Tech Stack

- **Framework**: Next.js 16.2.3 (App Router)
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **State Management**: React Context + Hooks
- **Validation**: Custom validation utilities

---

## 🔧 Key Features Explained

### 1. **Cart Management**
The cart uses React Context to manage shopping state:
- Automatically saves to localStorage
- Validates stock before adding items
- Prevents overselling

### 2. **Product Filtering & Sorting**
- Filter by category (Joggers, Sweatshirts, Kids Dresses, Adult Dresses)
- Sort by: Featured, Price (Low-High), Price (High-Low), Rating
- Real-time updates with URL search params

### 3. **Secure Checkout**
- Email validation with regex pattern
- Phone number validation
- Credit card formatting and validation
- Required field validation
- Order confirmation with unique ID generation

### 4. **Responsive Navigation**
- Sticky header for easy access
- Mobile menu drawer
- Cart item count badge
- Breadcrumb navigation on product pages

---

## 💡 Customization Guide

### Add New Products
Edit `src/constants/products.ts`:
```typescript
{
  id: 'unique-id',
  name: 'Product Name',
  description: 'Description',
  price: 99.99,
  originalPrice: 129.99, // Optional
  category: 'joggers', // or 'sweatshirts', 'kids-dresses', 'adult-dresses'
  image: '/products/image.jpg',
  images: ['/products/image1.jpg', '/products/image2.jpg'],
  variants: [
    { size: 'M', color: 'Black', stock: 20 },
    // ... more variants
  ],
  rating: 4.8,
  reviews: 142,
  featured: true,
}
```

### Update Colors & Branding
- Edit Tailwind colors in `tailwind.config.ts`
- Update logo by replacing `public/logo.svg`
- Modify header/footer colors in component files

### Modify Product Images
1. Add images to `public/products/` folder
2. Update image paths in `src/constants/products.ts`

---

## 📊 Future Enhancements

- ✅ Product reviews and ratings system
- ✅ User accounts and order history
- ✅ Real payment integration (Stripe, PayPal)
- ✅ Email notifications
- ✅ Admin dashboard for inventory management
- ✅ Search functionality
- ✅ Wishlist/Favorites
- ✅ Coupon codes and discounts
- ✅ Analytics and tracking

---

## 🛡️ Security Considerations

The app includes:
- Input validation on all forms
- Protected cart data in localStorage
- HTTPS-ready (deploy with SSL)
- No sensitive data stored in client-side code
- CSRF protection ready (add when integrating real payments)

**For production**, add:
- Real payment gateway integration (Stripe/PayPal)
- Backend API for order processing
- Database for order storage
- Admin authentication
- Rate limiting on checkout

---

## 📞 Support

For support or custom features, contact the Funmiano Couture team.

---

## 📄 License

© 2026 Funmiano Couture Styles. All rights reserved.

---

## 🎯 Next Steps

1. **Customize Products** - Update product data and images
2. **Add Your Content** - Update about, contact, blog pages
3. **Integrate Payments** - Connect Stripe or PayPal
4. **Set Up Backend** - Create API for orders and inventory
5. **Deploy** - Use Vercel, Netlify, or your hosting provider

---

**Happy selling!** 🎉👗

Your Funmiano Couture e-commerce app is ready to go live!
