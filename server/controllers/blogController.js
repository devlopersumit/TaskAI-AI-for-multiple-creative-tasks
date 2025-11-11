import { generateBlogTitles } from '../services/aiService.js';
import { upsertUser } from '../models/userRepository.js';
import { createCreation } from '../models/creationRepository.js';

export const generateTitles = async (req, res, next) => {
  try {
    const { topic, category, vibe, user } = req.body;

    if (!topic || !category || !vibe) {
      const error = new Error('Topic, category, and vibe are required.');
      error.status = 400;
      throw error;
    }

    if (user?.id) {
      await upsertUser({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
      });
    }

    const titles = await generateBlogTitles({ topic, category, vibe });

    await createCreation({
      userId: user?.id,
      type: 'blog-title',
      prompt: `${topic} (${category} · ${vibe})`,
      content: { titles, category, vibe },
    });

    res.json({
      success: true,
      data: {
        titles,
      },
    });
  } catch (error) {
    next(error);
  }
};

