import { Router } from 'express';
import { check, CustomSanitizer } from 'express-validator';

import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';
import expressValidatorHandler from '../middleware/expressValidatorHandler';
import { addComment } from '../controllers/comments';

const router = Router();

const sanitizeMovieId: CustomSanitizer = (value: string) => {
  if (typeof value === 'string') {
    return value;
  }

  throw new ErrorResponse('movieId should be a string', 422);
};

router.post(
  '/',
  check('movieId')
    .notEmpty()
    .withMessage('Please provide a movie i.d')
    .bail()
    .customSanitizer(sanitizeMovieId),
  check('comment').notEmpty().withMessage('Please provide a comment'),
  expressValidatorHandler,
  asyncHandler(addComment)
);

export default router;
