'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils/formatting';

export default function CartPage() {
  const { items, total, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart.</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.productId}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      Size: <span className="font-medium">{item.size}</span> | Color:{' '}
                      <span className="font-medium">{item.color}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>

                  {/* Quantity and Total */}
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="w-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                        min="1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold text-gray-900 mb-2">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (estimated)</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(total * 0.1)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(total * 1.1)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2 text-center text-sm text-gray-600">
                <p>✓ Secure checkout</p>
                <p>✓ Free shipping</p>
                <p>✓ Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
