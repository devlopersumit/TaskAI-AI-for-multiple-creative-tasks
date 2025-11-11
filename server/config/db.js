import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not defined.');
}

export const sql = neon(connectionString);

const runStatement = async (statement, description) => {
  try {
    await statement;
  } catch (error) {
    console.warn(`[db:init] Skipped ${description}: ${error.message}`);
  }
};

export const initializeDatabase = async () => {
  await runStatement(sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`, 'pgcrypto extension');

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT,
      full_name TEXT,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS creations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
      type TEXT NOT NULL,
      prompt TEXT NOT NULL,
      content JSONB NOT NULL,
      is_published BOOLEAN DEFAULT FALSE,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS creation_likes (
      creation_id UUID REFERENCES creations(id) ON DELETE CASCADE,
      user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      PRIMARY KEY (creation_id, user_id)
    )
  `;
};

export default sql;
