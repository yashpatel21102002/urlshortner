import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || '';
const options = {};

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

const client: MongoClient = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

export default async function dbConnect() {
    const db = (await clientPromise).db('urlShortener');
    return db;
}
