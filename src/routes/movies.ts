import { Router } from 'express';

import asyncHandler from '../middleware/async';
import { getMovies, getMovie } from '../controllers/movies';

const router = Router();

router.get('/', asyncHandler(getMovies));
router.get('/:id', asyncHandler(getMovie));

export default router;
