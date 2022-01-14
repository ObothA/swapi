import { RequestHandler } from 'express';

export const getMovies: RequestHandler = async (req, res) => {
  res.send('Hello World!');
};
