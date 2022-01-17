import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import ErrorResponse from '../utils/errorResponse';

// handle errors from express validator

const expressValidatorHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new ErrorResponse('Validation Error', 422, errors.array()));
  }

  next();
};

export default expressValidatorHandler;
