import { Router } from 'express';
import { getCommunityFeed } from '../controllers/communityController.js';

const router = Router();

router.get('/creations', getCommunityFeed);

export default router;

