import { Router } from 'express';
import { backgroundRemoval, generateImages, objectRemoval } from '../controllers/imageController.js';
import upload from '../middleware/upload.js';

const router = Router();

router.post('/generate', generateImages);
router.post('/remove-background', upload.single('image'), backgroundRemoval);
router.post('/remove-object', upload.single('image'), objectRemoval);

export default router;

