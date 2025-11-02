import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get('file') as File;
  const filename = `${Date.now()}_${file.name}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadPath = path.join(process.cwd(), 'public', 'uploads', filename);
  await writeFile(uploadPath, buffer);

  const client = await clientPromise;
  const songs = client.db().collection('songs');
  await songs.insertOne({
    title: file.name.replace('.mp3', ''),
    filename,
    uploadedAt: new Date()
  });

  return NextResponse.json({ message: 'Uploaded', filename });
}
