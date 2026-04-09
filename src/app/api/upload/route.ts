import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const ext = file.name.split('.').pop();
    const filename = `product-${timestamp}-${randomString}.${ext}`;

    // Ensure directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'products');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Write file
    const buffer = await file.arrayBuffer();
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, Buffer.from(buffer));

    // Return the public path
    const publicPath = `/products/${filename}`;

    return NextResponse.json(
      { 
        success: true, 
        path: publicPath,
        filename: filename,
        message: 'Image uploaded successfully'
      },
      { status: 200 }
    );
  } catch {
    console.error('Upload error');
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
