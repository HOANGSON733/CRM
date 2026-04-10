import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { config } from '../config';

const client = new MongoClient(config.mongoUri);

export async function connectMongo() {
  await client.connect();
  const db = client.db(config.dbName);
  await db.command({ ping: 1 });
  await db.collection('users').createIndex({ account: 1 }, { unique: true });
  await db.collection('products').createIndex({ sku: 1 }, { unique: true, sparse: true });
  await db.collection('service_categories').createIndex({ normalizedName: 1 }, { unique: true });
  await db.collection('product_categories').createIndex({ normalizedName: 1 }, { unique: true });
  await db.collection('pos_orders').createIndex({ createdAt: -1 });
  await seedDefaultServiceCategories();
  await seedDefaultProductCategories();
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

async function seedDefaultServiceCategories() {
  const defaults = [
    { name: 'Cắt & Tạo Kiểu', icon: 'scissors', color: '#4a0e0e' },
    { name: 'Hóa Chất', icon: 'palette', color: '#c5a059' },
    { name: 'Phục Hồi', icon: 'sparkles', color: '#1a1a1a' },
  ];

  const categories = currentDb().collection('service_categories');
  for (const item of defaults) {
    await categories.updateOne(
      { normalizedName: item.name.toLowerCase() },
      {
        $setOnInsert: {
          ...item,
          normalizedName: item.name.toLowerCase(),
          description: '',
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
  }
}

async function seedDefaultProductCategories() {
  const defaults = [
    { name: 'Dưỡng tóc & Phục hồi', icon: 'sparkles', color: '#4a0e0e' },
    { name: 'Dầu gội & Dầu xả', icon: 'coffee', color: '#c5a059' },
    { name: 'Tạo kiểu', icon: 'scissors', color: '#1a1a1a' },
  ];

  const categories = currentDb().collection('product_categories');
  for (const item of defaults) {
    await categories.updateOne(
      { normalizedName: item.name.toLowerCase() },
      {
        $setOnInsert: {
          ...item,
          normalizedName: item.name.toLowerCase(),
          description: '',
          isVisible: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
  }
}
