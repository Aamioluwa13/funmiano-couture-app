'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/constants/products';
import { formatCurrency } from '@/utils/formatting';
import { useCart } from '@/context/CartContext';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = PRODUCTS.find(p => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link href="/products" className="text-blue-600 hover:text-blue-800">
          Back to products
        </Link>
      </div>
    );
  }

  const colors = Array.from(new Set(product.variants.map(v => v.color)));
  const sizes = Array.from(new Set(product.variants.map(v => v.size)));

  const selectedVariant = product.variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    if (!selectedVariant || selectedVariant.stock < quantity) {
      alert('Insufficient stock');
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            Products
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="relative bg-gray-100 rounded-lg overflow-hidden h-96 sm:h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discountPercentage > 0 && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold">
                  -{discountPercentage}%
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-4 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-600 transition"
                  >
                    <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg mb-6">{product.description}</p>
            </div>

            {/* Selection Options */}
            <div className="mb-6 space-y-6">
              {/* Color Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Color: <span className="text-blue-600">{selectedColor || 'Select'}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedSize('');
                      }}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                        selectedColor === color
                          ? 'border-blue-600 bg-blue-50 text-blue-900'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Size: <span className="text-blue-600">{selectedSize || 'Select'}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {selectedColor ? (
                    sizes
                      .filter(size => product.variants.some(v => v.size === size && v.color === selectedColor))
                      .map((size) => {
                        const variant = product.variants.find(v => v.size === size && v.color === selectedColor);
                        const outOfStock = !variant || variant.stock === 0;
                        return (
                          <button
                            key={size}
                            onClick={() => !outOfStock && setSelectedSize(size)}
                            disabled={outOfStock}
                            className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
                              outOfStock
                                ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedSize === size
                                ? 'border-blue-600 bg-blue-50 text-blue-900'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {size}
                            {outOfStock && ' (Out)'}
                          </button>
                        );
                      })
                  ) : (
                    <p className="text-gray-500 text-sm">Select a color first</p>
                  )}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-none focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Info */}
            {selectedVariant && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-900 text-sm font-medium">
                  {selectedVariant.stock > 5
                    ? `${selectedVariant.stock} in stock - Available now`
                    : selectedVariant.stock > 0
                    ? `Only ${selectedVariant.stock} left in stock`
                    : 'Out of stock'}
                </p>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className={`w-full px-6 py-4 rounded-lg font-semibold text-lg transition mb-4 ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : !selectedVariant || selectedVariant.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="w-full px-6 py-3 rounded-lg font-semibold text-gray-900 border-2 border-gray-300 text-center hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>

            {/* Product Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Category</h3>
                <p className="text-gray-600 capitalize">{product.category.replace('-', ' ')}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Availability</h3>
                <p className="text-gray-600">
                  {product.variants.reduce((sum, v) => sum + v.stock, 0) > 0
                    ? 'In Stock'
                    : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
