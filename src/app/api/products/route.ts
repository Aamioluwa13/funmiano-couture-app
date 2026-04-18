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
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 100 * attempt));
      } else {
        throw error;
      }
    }
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
    console.log('Received product data:', body);
    
    const products = await readProducts();

    // Generate new ID
    const newId = Math.max(...products.map(p => parseInt(p.id) || 0), 0) + 1;

    // Create new product
    const newProduct: Product = {
      id: newId.toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    console.log('Creating new product:', newProduct);
    products.push(newProduct);
    await writeProductsWithRetry(products);
    console.log('Product saved successfully');

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to add product: ${errorMessage}` },
      { status: 500 }
    );
  }
}
