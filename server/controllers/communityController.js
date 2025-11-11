import { getPublishedCreations } from '../models/creationRepository.js';

const reshapeCreation = (creation) => ({
  id: creation.id,
  prompt: creation.prompt,
  content: creation.content,
  type: creation.type,
  createdAt: creation.created_at,
  userId: creation.user_id,
  likes: creation.metadata?.likes ?? [],
  metadata: creation.metadata ?? {},
});

export const getCommunityFeed = async (req, res, next) => {
  try {
    const limit = Number(req.query.limit) || 12;
    const creations = await getPublishedCreations({ limit });

    res.json({
      success: true,
      data: creations.map(reshapeCreation),
    });
  } catch (error) {
    next(error);
  }
};

