import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload endpoint called');
    const formData = await request.formData();
    console.log('FormData received');
    
    const file = formData.get('file') as File;
    console.log('File from formData:', { name: file?.name, size: file?.size, type: file?.type });

    if (!file) {
      console.error('No file provided');
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size);
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
    console.log('Generated filename:', filename);

    // Ensure directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'products');
    console.log('Uploads directory:', uploadsDir);
    
    if (!existsSync(uploadsDir)) {
      console.log('Creating uploads directory');
      await mkdir(uploadsDir, { recursive: true });
    }

    // Write file
    const buffer = await file.arrayBuffer();
    const filePath = path.join(uploadsDir, filename);
    console.log('Writing file to:', filePath);
    
    await writeFile(filePath, Buffer.from(buffer));
    console.log('File written successfully');

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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Upload error:', errorMessage, error);
    return NextResponse.json(
      { error: `Failed to upload image: ${errorMessage}` },
      { status: 500 }
    );
  }
}
