import { Router } from 'express';
import { query, CustomSanitizer } from 'express-validator';

import asyncHandler from '../middleware/async';
import expressValidatorHandler from '../middleware/expressValidatorHandler';
import ErrorResponse from '../utils/errorResponse';
import { getMovieCharacters } from '../controllers/movieCharacters';

const router = Router();

const sanitizeSortQuery: CustomSanitizer = (value: string) => {
  if (
    value.toLowerCase() === 'name' ||
    value.toLowerCase() === 'gender' ||
    value.toLowerCase() === 'height'
  ) {
    return value.toLowerCase();
  }

  throw new ErrorResponse(
    `${value} is not a correct sort query. It's either name, gender or height.`,
    422
  );
};

const sanitizeSortOrderQuery: CustomSanitizer = (value: string) => {
  if (value.toLowerCase() === 'asc' || value.toLowerCase() === 'dsc') {
    return value.toLowerCase();
  }

  throw new ErrorResponse(`${value} is not a correct sort-order query. It's either asc or dsc.`, 422);
};

const sanitizeGenderQuery: CustomSanitizer = (value: string) => {
  if (value.toLowerCase() === 'male' || value.toLowerCase() === 'female') {
    return value.toLowerCase();
  }

  throw new ErrorResponse(`${value} is not a correct gender query. It's either female or male.`, 422);
};

router.get(
  '/:movieID',
  query('sort').customSanitizer(sanitizeSortQuery).optional(),
  query('sort_order').customSanitizer(sanitizeSortOrderQuery).optional(),
  query('gender').customSanitizer(sanitizeGenderQuery).optional(),
  expressValidatorHandler,
  asyncHandler(getMovieCharacters)
);

export default router;
