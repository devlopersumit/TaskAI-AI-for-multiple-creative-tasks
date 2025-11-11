import { generateImagesFromPrompt } from '../services/aiService.js';
import { removeBackground, removeObject } from '../services/cloudinaryService.js';
import { upsertUser } from '../models/userRepository.js';
import { createCreation } from '../models/creationRepository.js';

export const generateImages = async (req, res, next) => {
  try {
    const { prompt, style, ratio, user, isPublished = false } = req.body;

    if (!prompt || !style || !ratio) {
      const error = new Error('Prompt, style, and ratio are required.');
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

    const images = await generateImagesFromPrompt({ prompt, style, ratio });

    const creation = await createCreation({
      userId: user?.id,
      type: 'image',
      prompt: `${prompt} · ${style} · ${ratio}`,
      content: { images, prompt, style, ratio },
      isPublished,
      metadata: { likes: [] },
    });

    res.json({
      success: true,
      data: {
        images,
        creationId: creation.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const parseUser = (payload) => {
  if (!payload) return null;
  try {
    return typeof payload === 'string' ? JSON.parse(payload) : payload;
  } catch {
    return null;
  }
};

export const backgroundRemoval = async (req, res, next) => {
  try {
    const user = parseUser(req.body.user);
    const isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    const file = req.file;

    if (!file?.buffer) {
      const error = new Error('Image file is required.');
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

    const resultUrl = await removeBackground(file.buffer);

    const creation = await createCreation({
      userId: user?.id,
      type: 'background-removal',
      prompt: 'Background removal',
      content: {
        originalFilename: file.originalname,
        resultUrl,
      },
      isPublished,
      metadata: { likes: [] },
    });

    res.json({
      success: true,
      data: {
        imageUrl: resultUrl,
        creationId: creation.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const objectRemoval = async (req, res, next) => {
  try {
    const prompt = req.body.prompt;
    const user = parseUser(req.body.user);
    const isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;
    const file = req.file;

    if (!file?.buffer) {
      const error = new Error('Image file is required.');
      error.status = 400;
      throw error;
    }

    if (!prompt) {
      const error = new Error('Describe the object to remove.');
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

    const resultUrl = await removeObject(file.buffer, prompt);

    const creation = await createCreation({
      userId: user?.id,
      type: 'object-removal',
      prompt,
      content: {
        originalFilename: file.originalname,
        prompt,
        resultUrl,
      },
      isPublished,
      metadata: { likes: [] },
    });

    res.json({
      success: true,
      data: {
        imageUrl: resultUrl,
        creationId: creation.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

