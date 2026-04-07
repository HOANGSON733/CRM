import { MongoClient } from 'mongodb';
import { config } from '../config';

const client = new MongoClient(config.mongoUri);

export async function connectMongo() {
  await client.connect();
  const db = client.db(config.dbName);
  await db.command({ ping: 1 });
  await db.collection('users').createIndex({ account: 1 }, { unique: true });
  console.log(`MongoDB connected: ${config.dbName}`);
}

export const usersCollection = () => client.db(config.dbName).collection('users');
export const currentDb = () => client.db(config.dbName);
