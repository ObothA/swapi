import { RequestHandler } from 'express';
import axios from 'axios';

export const getMovies: RequestHandler = async (req, res) => {
  const movieREsponse = await axios.get(`${process.env.SWAPI_URL}/films`);
  console.log(movieREsponse.data);
  res.send('Hello World!');
};
