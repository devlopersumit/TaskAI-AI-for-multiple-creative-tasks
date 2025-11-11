import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

import { reviewResumeWithAI } from '../services/aiService.js';
import { upsertUser } from '../models/userRepository.js';
import { createCreation } from '../models/creationRepository.js';

const parseUser = (payload) => {
  if (!payload) return null;
  try {
    return typeof payload === 'string' ? JSON.parse(payload) : payload;
  } catch {
    return null;
  }
};

const extractTextFromFile = async (file) => {
  if (!file?.buffer) {
    return '';
  }

  const extension = file.originalname?.split('.').pop()?.toLowerCase();

  try {
    if (extension === 'pdf') {
      const result = await pdfParse(file.buffer);
      return result.text ?? '';
    }

    if (extension === 'docx') {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return result.value ?? '';
    }
  } catch (error) {
    console.warn('[resume:parse] Failed to extract text:', error.message);
  }

  return file.buffer.toString('utf8');
};

export const reviewResume = async (req, res, next) => {
  try {
    const user = parseUser(req.body.user);
    const notes = req.body.notes ?? '';
    const isPublished = req.body.isPublished === 'true' || req.body.isPublished === true;

    let resumeText = typeof req.body.resumeText === 'string' ? req.body.resumeText : '';

    if (req.file) {
      const extracted = await extractTextFromFile(req.file);
      resumeText = `${resumeText}\n\n${extracted}`.trim();
    }

    if (!resumeText) {
      const error = new Error('Unable to read resume content. Please upload a PDF/DOCX or paste text.');
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

    const feedback = await reviewResumeWithAI({
      resumeText,
      roleNotes: notes,
    });

    const creation = await createCreation({
      userId: user?.id,
      type: 'resume-review',
      prompt: 'Resume review',
      content: {
        feedback,
        notes,
      },
      isPublished,
      metadata: {
        filename: req.file?.originalname ?? null,
      },
    });

    res.json({
      success: true,
      data: {
        ...feedback,
        creationId: creation.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

