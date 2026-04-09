'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { formatCurrency } from '@/utils/formatting';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = () => {
    if (product.variants.length > 0) {
      const firstVariant = product.variants[0];
      addToCart(product, 1, firstVariant.size, firstVariant.color);
      setIsAdding(true);
      setTimeout(() => setIsAdding(false), 1500);
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group">
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className="relative overflow-hidden bg-gray-200 h-64 sm:h-72">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {discountPercentage > 0 && (
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{discountPercentage}%
            </div>
          )}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="group/title">
          <h3 className="text-lg font-semibold text-gray-900 group-hover/title:text-blue-600 transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 my-3">
          <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleQuickAdd}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
              isAdding
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAdding ? '✓ Added' : 'Add to Cart'}
          </button>
          <Link
            href={`/products/${product.id}`}
            className="flex-1 px-4 py-2 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-center"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
