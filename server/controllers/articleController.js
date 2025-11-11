import { generateArticleDraft } from '../services/aiService.js';
import { upsertUser } from '../models/userRepository.js';
import { createCreation } from '../models/creationRepository.js';

export const generateArticle = async (req, res, next) => {
  try {
    const {
      topic,
      tone,
      length,
      outline,
      keywords,
      user,
      isPublished = false,
    } = req.body;

    if (!topic || !tone || !length || !outline) {
      const error = new Error('Topic, tone, length, and outline are required.');
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

    const draft = await generateArticleDraft({
      topic,
      tone,
      length,
      outline,
      keywords,
    });

    const creation = await createCreation({
      userId: user?.id,
      type: 'article',
      prompt: topic,
      content: { draft, tone, length, outline, keywords },
      isPublished,
    });

    res.json({
      success: true,
      data: {
        draft,
        creationId: creation.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

