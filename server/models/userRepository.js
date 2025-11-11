import { sql } from '../config/db.js';

export const upsertUser = async ({ id, email, fullName, imageUrl }) => {
  if (!id) {
    throw new Error('User id is required.');
  }

  await sql`
    INSERT INTO users (id, email, full_name, image_url, updated_at)
    VALUES (${id}, ${email ?? null}, ${fullName ?? null}, ${imageUrl ?? null}, NOW())
    ON CONFLICT (id)
    DO UPDATE SET
      email = EXCLUDED.email,
      full_name = EXCLUDED.full_name,
      image_url = EXCLUDED.image_url,
      updated_at = NOW()
  `;

  return id;
};

