/* eslint-disable no-console */
import mongoose from 'mongoose';

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/usmolivet';

export default async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(dbUrl, { autoIndex: true });
    console.log('✔️  Connected to database');
  } catch (err) {
    console.log(`❌ Error during database connection : ${err}`);
  }
}
