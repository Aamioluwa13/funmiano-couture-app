'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { productAPI } from '@/lib/productAPI';

const CATEGORIES = ['joggers', 'sweatshirts', 'kids-dresses', 'adult-dresses'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'joggers',
    image: '',
    featured: false,
  });

  const [variants, setVariants] = useState([
    { size: 'M', color: '', stock: '' },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { size: 'M', color: '', stock: '' }]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    if (variants.some(v => !v.size || !v.color || !v.stock)) {
      setError('Please fill in all variant fields');
      return;
    }

    setIsLoading(true);
    try {
      await productAPI.create({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        category: formData.category as 'joggers' | 'sweatshirts' | 'kids-dresses' | 'adult-dresses',
        image: formData.image,
        images: [formData.image],
        variants: variants.map(v => ({
          size: v.size,
          color: v.color,
          stock: parseInt(v.stock),
        })),
        featured: formData.featured,
        rating: 5.0,
        reviews: 0,
      });

      router.push('/admin/dashboard');
    } catch {
      setError('Failed to add product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-900">
              ← Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Classic Black Joggers"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Featured Product
                </label>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="49.99"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (optional)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="59.99"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Variants (Size/Color/Stock)</h2>
              <button
                type="button"
                onClick={addVariant}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-3 rounded transition"
              >
                + Add Variant
              </button>
            </div>

            <div className="space-y-3">
              {variants.map((variant, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Size</label>
                    <select
                      value={variant.size}
                      onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    >
                      {SIZES.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="text"
                      value={variant.color}
                      onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                      placeholder="Black"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={variant.stock}
                      onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                      placeholder="10"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    />
                  </div>

                  {variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-600 hover:text-red-900 font-semibold text-sm p-2"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Product Image</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/products/joggers-black.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">💡 Upload images to public/products folder and reference the path here</p>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
            >
              {isLoading ? '⏳ Adding...' : '✓ Add Product'}
            </button>
            <Link
              href="/admin/dashboard"
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
