import { Router } from 'express';

import asyncHandler from '../middleware/async';
import { addComment } from '../controllers/comments';

const router = Router();

router.post('/', asyncHandler(addComment));

export default router;
