import {
  getPublishedCreations,
  getUserDrafts,
  getUserUsageSnapshot,
} from '../models/creationRepository.js';

const AVAILABLE_TOOLS = 6;

const reshapeCreation = (creation) => ({
  id: creation.id,
  prompt: creation.prompt,
  createdAt: creation.created_at,
  content: creation.content,
  type: creation.type,
  isPublished: creation.is_published,
  metadata: creation.metadata,
});

export const getDashboardSummary = async (req, res, next) => {
  try {
    const userId = req.query.userId;

    const [usage, drafts, published] = await Promise.all([
      getUserUsageSnapshot({ userId }),
      getUserDrafts({ userId, limit: 6 }),
      getPublishedCreations({ limit: 6 }),
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          drafts: usage.drafts,
          published: usage.published,
          toolsAvailable: AVAILABLE_TOOLS,
          lastActive: drafts[0]?.created_at ?? null,
        },
        recentDrafts: drafts.map(reshapeCreation),
        publishedHighlights: published.map(reshapeCreation),
      },
    });
  } catch (error) {
    next(error);
  }
};

