'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export const Header = () => {
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="Funmiano Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              Funmiano Couture
            </span>
            <span className="text-xl font-bold text-gray-900 sm:hidden">
              Funmiano
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Shop
            </Link>
            <Link href="/products?category=joggers" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Joggers
            </Link>
            <Link href="/products?category=sweatshirts" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Sweatshirts
            </Link>
            <Link href="/products?category=kids-dresses" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Kids
            </Link>
            <Link href="/products?category=adult-dresses" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Dresses
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Shop All
            </Link>
            <Link href="/products?category=joggers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Joggers
            </Link>
            <Link href="/products?category=sweatshirts" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Sweatshirts
            </Link>
            <Link href="/products?category=kids-dresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Kids Dresses
            </Link>
            <Link href="/products?category=adult-dresses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
              Adult Dresses
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};
