"use server"
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import dbConnect from '@/lib/db';

export async function POST(req: NextRequest) {
    const { originalUrl, customAlias }: { originalUrl: string; customAlias?: string } = await req.json();

    if (!originalUrl) {
        return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
    }

    const shortId = customAlias || nanoid(8);

    const db = await dbConnect();
    const collection = db.collection('urls');

    const existing = await collection.findOne({ shortId });
    if (existing) {
        return NextResponse.json({ error: 'Custom alias already exists' }, { status: 400 });
    }

    await collection.insertOne({ shortId, originalUrl, createdAt: new Date() });

    return NextResponse.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` }, { status: 201 });
}
