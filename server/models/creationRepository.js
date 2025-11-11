import { sql } from '../config/db.js';

const parseJson = (value) => {
  if (value === null || value === undefined) return null;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const normalizeCreation = (row) => ({
  ...row,
  content: parseJson(row.content),
  metadata: parseJson(row.metadata),
});

export const createCreation = async ({
  userId,
  type,
  prompt,
  content,
  isPublished = false,
  metadata = {},
}) => {
  const [creation] = await sql`
    INSERT INTO creations (user_id, type, prompt, content, is_published, metadata)
    VALUES (
      ${userId ?? null},
      ${type},
      ${prompt},
      ${sql.json(content ?? {})},
      ${isPublished},
      ${sql.json(metadata ?? {})}
    )
    RETURNING *
  `;

  return normalizeCreation(creation);
};

export const getUserDrafts = async ({ userId, limit = 5 }) => {
  if (!userId) return [];

  const drafts = await sql`
    SELECT *
    FROM creations
    WHERE user_id = ${userId} AND is_published = FALSE
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return drafts.map(normalizeCreation);
};

export const getPublishedCreations = async ({ limit = 6 }) => {
  const creations = await sql`
    SELECT *
    FROM creations
    WHERE is_published = TRUE
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;

  return creations.map(normalizeCreation);
};

export const getUserUsageSnapshot = async ({ userId }) => {
  if (!userId) {
    return {
      drafts: 0,
      published: 0,
      toolsUsed: 0,
    };
  }

  const [stats] = await sql`
    SELECT
      COUNT(*) FILTER (WHERE is_published = FALSE) AS drafts,
      COUNT(*) FILTER (WHERE is_published = TRUE) AS published,
      COUNT(DISTINCT type) AS tools_used
    FROM creations
    WHERE user_id = ${userId}
  `;

  return {
    drafts: Number(stats?.drafts ?? 0),
    published: Number(stats?.published ?? 0),
    toolsUsed: Number(stats?.tools_used ?? 0),
  };
};

