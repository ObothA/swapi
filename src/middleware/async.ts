import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * @description this helps us avoid repeatition of the try catch blocks
 * @param {*} fn
 * @returns
 */
const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
