import { Router } from 'express';

import asyncHandler from '../middleware/async';
import { getMovieCharacters } from '../controllers/movieCharacters';

const router = Router();

router.get('/:movieID', asyncHandler(getMovieCharacters));

export default router;
