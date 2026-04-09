import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { config } from '../config';

const client = new MongoClient(config.mongoUri);

export async function connectMongo() {
  await client.connect();
  const db = client.db(config.dbName);
  await db.command({ ping: 1 });
  await db.collection('users').createIndex({ account: 1 }, { unique: true });
  await seedAdminUser();
  console.log(`MongoDB connected: ${config.dbName}`);
}

export const usersCollection = () => client.db(config.dbName).collection('users');
export const currentDb = () => client.db(config.dbName);

async function seedAdminUser() {
  const account = String(process.env.SEED_ADMIN_ACCOUNT || '')
    .trim()
    .toLowerCase();
  const password = String(process.env.SEED_ADMIN_PASSWORD || '');
  const role = String(process.env.SEED_ADMIN_ROLE || 'admin').trim() || 'admin';

  if (!account || !password) return;

  const users = usersCollection();
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await users.updateOne(
    { account },
    {
      $setOnInsert: {
        account,
        password: hashedPassword,
        role,
        createdAt: new Date(),
      },
    },
    { upsert: true }
  );

  if (result.upsertedCount) {
    console.log(`Seeded admin account: ${account}`);
  }
}
