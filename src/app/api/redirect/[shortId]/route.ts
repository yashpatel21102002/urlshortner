"use server"
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { shortId: string } }) {
    const { shortId } = params;

    const db = await dbConnect();
    const collection = db.collection('urls');

    const url = await collection.findOne({ shortId });

    if (!url) {
        return NextResponse.json({ error: 'Short URL not found' }, { status: 404 });
    }

    // Redirect to the original URL
    return NextResponse.redirect(url.originalUrl, 301);
}
