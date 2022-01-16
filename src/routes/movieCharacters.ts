import { Router } from 'express';
import { query, CustomSanitizer } from 'express-validator';

import asyncHandler from '../middleware/async';
import expressValidatorHandler from '../middleware/expressValidatorHandler';
import ErrorResponse from '../utils/errorResponse';
import { getMovieCharacters } from '../controllers/movieCharacters';

const router = Router();

const sanitizeSortQuery: CustomSanitizer = (value: string) => {
  if (value.toLowerCase() === 'name') {
    return true;
  }

  throw new ErrorResponse(`${value} is not a correct sort query. It's either name, gender or height.`);
};

const sanitizeSortOrderQuery: CustomSanitizer = (value: string) => {
  if (value.toLowerCase() === 'asc' || value.toLowerCase() === 'dsc') {
    return true;
  }

  throw new ErrorResponse(`${value} is not a correct sort-order query. It's either asc or dsc.`);
};

router.get(
  '/:movieID',
  query('sort').customSanitizer(sanitizeSortQuery).optional(),
  query('sort-order').customSanitizer(sanitizeSortOrderQuery).optional(),
  expressValidatorHandler,
  asyncHandler(getMovieCharacters)
);

export default router;
