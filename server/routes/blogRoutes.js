import { Router } from 'express';
import { generateTitles } from '../controllers/blogController.js';

const router = Router();

router.post('/generate', generateTitles);

export default router;

