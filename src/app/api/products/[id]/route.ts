import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/types';

// Path to products JSON file
const productsFilePath = path.join(process.cwd(), 'public', 'products.json');

// Helper to read products file
async function readProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper to write products file
async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
}

// Helper to write products file with retry logic
async function writeProductsWithRetry(products: Product[], retries = 3): Promise<void> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await writeProducts(products);
      console.log(`Products saved successfully on attempt ${attempt}`);
      return;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 100 * attempt));
      } else {
        throw error;
      }
    }
  }
}

// GET - Fetch single product by ID
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await readProducts();
    const product = products.find(p => p.id === id);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = await readProducts();

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update product
    const updatedProduct = {
      ...products[productIndex],
      ...body,
      id, // Keep original ID
      updatedAt: new Date().toISOString(),
    };

    products[productIndex] = updatedProduct;
    await writeProductsWithRetry(products);

    return NextResponse.json(updatedProduct);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Remove product
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = await readProducts();

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Remove product
    products.splice(productIndex, 1);
    await writeProductsWithRetry(products);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
