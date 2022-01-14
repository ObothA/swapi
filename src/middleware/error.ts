/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';

import ErrorResponse from '../utils/errorResponse';

type ValidationErrors = {
  [prop: string]: string;
};

type ErrorObject = {
  success: boolean;
  error: string;
  validationErrors?: ValidationErrors;
};

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err?.code === 'P2002') {
    // Handle errors from prisma
    err.statusCode = 422;
    err.message = `${err?.meta?.target.toString()} already exist(s).`;
  }

  let response: ErrorObject = {
    success: false,
    error: err.message || 'Server Error',
  };

  if (err?.errors) {
    const validationErrors: ValidationErrors = {};
    err?.errors?.forEach((error) => (validationErrors[error.param] = error.msg));
    response = {
      ...response,
      validationErrors,
    };
  }

  if (process.env.NODE_ENV !== 'testing') {
    console.log();
    console.log(response);
    console.log();
  }

  res.status(err?.statusCode ?? 500).json({
    ...response,
  });
};

export default errorHandler;
