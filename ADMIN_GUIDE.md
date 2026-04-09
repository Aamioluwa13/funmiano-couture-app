# 🔐 Admin Panel Guide - Funmiano Couture

## Welcome to the Admin Dashboard!

Your admin panel is now live! Your client can manage all products directly through an intuitive web interface.

---

## 🚀 Quick Start

### 1. **Access the Admin Panel**
Visit: `https://funmiano-couture-app.vercel.app/admin`

### 2. **Login**
**Default Password**: `funmiano2024`

⚠️ **IMPORTANT:** Change this password! See "Security" section below.

### 3. **You're In!**
You'll see the Admin Dashboard with all your products.

---

## 📊 Admin Dashboard Features

### Dashboard Overview
The main dashboard shows:
- **Total Products** - Count of all products
- **Categories** - Number of different categories
- **Featured** - Count of featured products

### Products Table
See all your products with:
- Product name & ID
- Category (Joggers, Sweatshirts, etc.)
- Current price
- Total stock across all sizes
- Featured status
- **Edit** and **Delete** buttons

---

## ➕ Adding Products

### Step 1: Click "Add Product"
From the dashboard, click the **+ Add Product** button in the top right.

### Step 2: Fill Basic Information
- **Product Name**: e.g., "Classic Black Joggers"
- **Description**: Detailed product info (size, material, care instructions)
- **Category**: Select from: Joggers, Sweatshirts, Kids Dresses, Adult Dresses
- **Featured**: Check if this is a featured product

### Step 3: Set Pricing
- **Price**: Current selling price (e.g., 45.99)
- **Original Price** (optional): For showing discounts (e.g., 59.99)

### Step 4: Add Variants
Variants are Size/Color/Stock combinations. For each size:
1. Select **Size** (XS, S, M, L, XL, XXL)
2. Enter **Color** (e.g., Black, Navy, Grey)
3. Enter **Stock** (how many in inventory)

**Add Multiple Variants**: Click "+ Add Variant" to add more sizes/colors

Example:
```
Size: M | Color: Black | Stock: 25
Size: L | Color: Black | Stock: 18
Size: M | Color: Navy  | Stock: 20
```

### Step 5: Add Product Image
- Enter the **Image URL** (path to image in public folder)
- Example: `/products/joggers-black.jpg`

💡 **To upload images:**
1. Go to your project folder
2. Place image in `public/products/` folder
3. Use path: `/products/filename.jpg`

### Step 6: Submit
Click **✓ Add Product** to save.

---

## ✏️ Editing Products

### From Dashboard
1. Find the product in the table
2. Click **Edit** button
3. Update any information
4. Click **Save**

*(Edit form coming soon!)*

---

## 🗑️ Deleting Products

### From Dashboard
1. Find the product in the table
2. Click **Delete** button
3. Confirm the deletion

⚠️ This cannot be undone!

---

## 🔒 Security & Password

### Current Password
**Default**: `funmiano2024`

### Change Password
1. Edit the file: `src/app/admin/page.tsx`
2. Find line: `const ADMIN_PASSWORD = 'funmiano2024';`
3. Replace with your new password
4. Redeploy the app

### Best Practices
- Use a strong password (mix of letters, numbers, symbols)
- Don't share the password
- Change it regularly
- Use different passwords for different admins

---

## 💾 Product Data Storage

### Current System
Products are stored in: `src/constants/products.ts`

When you add/edit products:
- Data is displayed immediately
- Changes are local to the browser
- To make permanent: Code needs to be updated (see next section)

### Make Changes Permanent

**Option 1: Database Setup (Recommended)**
Set up a database (Supabase/Firebase) so changes are permanent without redeployment.

**Option 2: Manual Update**
1. After adding products through admin panel
2. Contact developer to update the code
3. Redeploy the app

---

## 📸 Managing Product Images

### Where to Store Images
All product images go in: `public/products/`

### Adding Images
1. **Upload image file** to `public/products/` folder
2. **Reference in product form** with path: `/products/filename.jpg`

### Supported Formats
- JPG/JPEG
- PNG
- WebP

### Image Size Recommendations
- **Product images**: 500x500px minimum
- **File size**: Keep under 500KB for faster loading

---

## 📋 Product Categories

Current categories:
- **Joggers** - Athletic wear
- **Sweatshirts** - Comfortable tops
- **Kids Dresses** - Children's clothing
- **Adult Dresses** - Women's dresses

To add new categories:
1. Contact developer
2. New category will be added to system

---

## 🎯 Featured Products

### What Are Featured Products?
Featured products appear on the homepage and in "Featured" sections.

### Set a Product as Featured
1. When adding/editing a product
2. Check the "Featured Product" checkbox
3. Save the product

### Featured Product Limit
You can have as many featured products as you want. We recommend 3-5 for best display.

---

## 📊 Inventory Management

### Track Stock
Each variant has a stock number:
- **Stock**: Quantity available for that size/color
- Sum of all variants = Total inventory

### Low Stock Warning
*(Coming soon: automatic alerts when stock is low)*

### Update Stock
1. Edit the product
2. Change stock numbers for each variant
3. Save

---

## ❓ Common Questions

### Q: Can I upload images directly?
**A:** Currently, images must be manually uploaded to the `public/products/` folder. We're working on drag-and-drop uploads.

### Q: How do I delete a category?
**A:** Categories are managed in the code. Contact your developer to add/remove categories.

### Q: Can multiple admins access simultaneously?
**A:** Yes! Everyone with the password can access, but only one person should edit at a time.

### Q: What if I forget the password?
**A:** Contact your developer to reset it.

### Q: Do changes save automatically?
**A:** Currently, they need to be made permanent by updating the code. Database integration coming soon!

---

## 🔧 Technical Details

### Admin Routes
- **Login**: `/admin`
- **Dashboard**: `/admin/dashboard`
- **Add Product**: `/admin/add-product`
- **Edit Product**: `/admin/edit-product/[id]` *(coming soon)*

### Technologies Used
- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Simple password (localStorage)

---

## 📞 Support

### Issues or Questions?
1. Check this guide first
2. Contact your developer
3. Report any bugs

### Feature Requests
Want new admin features? Tell your developer about:
- Bulk uploads
- Product categories management
- Customer orders view
- Analytics dashboard
- Email notifications

---

## 🚀 Future Enhancements

Coming soon:
- ✅ Database integration (permanent storage)
- ✅ Image upload with drag-and-drop
- ✅ Bulk product import (CSV)
- ✅ Advanced search & filtering
- ✅ Sales analytics
- ✅ Multiple admin accounts
- ✅ Audit logs

---

## 📝 Checklist for First Time

- [ ] Visit `/admin` and login
- [ ] Review existing products on dashboard
- [ ] Add a test product
- [ ] Upload an image
- [ ] Edit the test product
- [ ] Delete the test product
- [ ] Change the admin password
- [ ] Keep password somewhere safe

---

## 🎉 You're All Set!

Your admin panel is ready to use! Start adding your products and let your store grow!

**Live Store**: https://funmiano-couture-app.vercel.app/  
**Admin Panel**: https://funmiano-couture-app.vercel.app/admin  

Happy selling! 🛍️✨
