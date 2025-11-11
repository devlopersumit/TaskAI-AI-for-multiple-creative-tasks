import { Router } from 'express';
import { generateArticle } from '../controllers/articleController.js';

const router = Router();

router.post('/generate', generateArticle);

export default router;

