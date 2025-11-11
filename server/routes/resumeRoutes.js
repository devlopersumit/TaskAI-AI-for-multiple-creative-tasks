import { Router } from 'express';
import { reviewResume } from '../controllers/resumeController.js';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/review', upload.single('resume'), reviewResume);

export default router;

