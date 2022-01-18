import { Router } from 'express';
import { check, CustomSanitizer, query } from 'express-validator';

import asyncHandler from '../middleware/async';
import ErrorResponse from '../utils/errorResponse';
import expressValidatorHandler from '../middleware/expressValidatorHandler';
import { addComment, getMovieComments } from '../controllers/comments';

const router = Router();

const sanitizeMovieId: CustomSanitizer = (value: string) => {
  if (typeof value === 'string') {
    return value;
  }

  throw new ErrorResponse('movieId should be a string', 422);
};

const sanitizeComment: CustomSanitizer = (value: string) => {
  if (value.length <= 500) {
    return value;
  }

  throw new ErrorResponse('A comment should be 500 characters or less.', 422);
};

router.post(
  '/',
  check('movieId')
    .notEmpty()
    .withMessage('Please provide a movie i.d')
    .bail()
    .customSanitizer(sanitizeMovieId),
  check('comment')
    .notEmpty()
    .withMessage('Please provide a comment')
    .bail()
    .customSanitizer(sanitizeComment),
  expressValidatorHandler,
  asyncHandler(addComment)
);

router.get(
  '/',
  query('movie_id').notEmpty().withMessage('Please provide the `movie_id` query parameter.'),
  expressValidatorHandler,
  asyncHandler(getMovieComments)
);

export default router;
