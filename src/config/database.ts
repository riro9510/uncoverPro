import mongoose from 'mongoose';
import pg from 'pg';

const { Pool } = pg;

export const connectDB = async () => {
  const dbType = process.env.DB_TYPE;

  try {
    if (dbType === 'mongo') {
      const uri = process.env.MONGO_URL!;
      await mongoose.connect(uri);
      console.log('✅ Connected to MongoDB');
    } else if (dbType === 'postgres') {
      const pool = new Pool({
        connectionString: process.env.POSTGRES_URI,
      });
      await pool.connect();
      console.log('✅ Connected to PostgreSQL');
    } else {
      console.warn('⚠️ No DB_TYPE specified, skipping DB connection');
    }
  } catch (err) {
    console.error('❌ DB Connection error:', err);
    process.exit(1);
  }
};