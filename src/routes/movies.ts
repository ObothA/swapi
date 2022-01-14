import { Router } from 'express';

import asyncHandler from '../middleware/async';
import { getMovies } from '../controllers/movies';

const router = Router();

router.get('/', asyncHandler(getMovies));

export default router;
