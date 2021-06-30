/* eslint-disable no-console */
import { connect } from 'mongoose';

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/usmolivet';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
};

export default async function connectDB(): Promise<void> {
  try {
    await connect(dbUrl, options);
    console.log('✔️  Connected to database');
  } catch (err) {
    console.log(`❌ Error during database connection : ${err}`);
  }
}
