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
    // If file doesn't exist, return empty array
    console.log('Products file not found, returning empty array');
    return [];
  }
}

// Helper to write products file
async function writeProducts(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing products file:', error);
    throw new Error('Failed to save products');
  }
}

// GET - Fetch all products
export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json(products);
  } catch {
    console.error('Error fetching products');
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Add new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const products = await readProducts();

    // Generate new ID
    const newId = Math.max(...products.map(p => parseInt(p.id) || 0), 0) + 1;

    // Create new product
    const newProduct: Product = {
      id: newId.toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    await writeProducts(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    console.error('Error adding product');
    return NextResponse.json(
      { error: 'Failed to add product' },
      { status: 500 }
    );
  }
}
