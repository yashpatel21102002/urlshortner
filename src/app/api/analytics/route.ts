"use server"
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
    const db = await dbConnect();
    const collection = db.collection('analytics');
    const data = await collection.find({}).toArray();

    return NextResponse.json(data, { status: 200 });
}
