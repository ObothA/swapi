import { RequestHandler } from 'express';
import axios from 'axios';

type Movie = {
  title: string;
};

type Film = {
  properties: { title: string };
};

export const getMovies: RequestHandler = async (req, res) => {
  const movieREsponse = await axios.get(`${process.env.SWAPI_URL}/films`);
  console.log(movieREsponse.data.result);

  const rawMovies = movieREsponse.data.result;
  const movies: Movie[] = rawMovies.map((film: Film) => ({
    title: film?.properties?.title,
  }));

  res.send(movies);
};
