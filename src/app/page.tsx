'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/constants/products';

export default function Home() {
  // Get featured products
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 8);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.svg" alt="Funmiano Logo" className="w-12 h-12 invert" />
                <span className="text-2xl font-bold">Funmiano Couture</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Premium Ready-to-Wear Fashion
              </h1>
              <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl">
                Discover our exclusive collection of joggers, sweatshirts, and dresses for the whole family. Quality, style, and comfort in every piece.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center"
                >
                  Shop Now
                </Link>
                <Link
                  href="/products?category=featured"
                  className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition text-center"
                >
                  View Featured
                </Link>
              </div>
            </div>

            {/* Right - Logo Display */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <img src="/logo.svg" alt="Funmiano Logo" className="w-32 h-32 sm:w-48 sm:h-48" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative overflow-hidden rounded-lg bg-gray-200 h-48 sm:h-56 flex items-center justify-center hover:shadow-lg transition"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-40 transition"></div>
              <div className="relative text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:scale-105 transition">
                  {category.name}
                </h3>
                <p className="text-gray-100">{category.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-gray-50">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Our Fashion Community
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Be the first to know about new collections, exclusive offers, and style tips from Funmiano Couture.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
          Why Choose Funmiano Couture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">
              All our pieces are crafted with premium materials and attention to detail for lasting comfort and style.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1V3a1 1 0 011-1h4a1 1 0 011 1v1h1V3a1 1 0 011 1v2h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v6h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Checkout</h3>
            <p className="text-gray-600">
              Your personal and payment information is encrypted and protected with the latest security standards.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0015.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Shipping</h3>
            <p className="text-gray-600">
              We ship your orders quickly and securely. Track your delivery every step of the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
