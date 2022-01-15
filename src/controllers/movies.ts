import { RequestHandler } from 'express';
import axios from 'axios';

import ErrorResponse from '../utils/errorResponse';

type Movie = {
  title: string;
  string: string;
  release_date: string;
  opening_crawl: string;
};

type Film = {
  properties: {
    title: string;
    release_date: string;
    opening_crawl: string;
  };
  uid: string;
};

export const getMovies: RequestHandler = async (req, res, next) => {
  const movieResponse = await axios.get(`${process?.env?.SWAPI_URL}/films`);
  const rawMovies = movieResponse?.data?.result;

  if (rawMovies) {
    const movies: Movie[] = rawMovies?.map((film: Film) => ({
      id: film?.uid,
      title: film?.properties?.title,
      opening_crawl: film?.properties?.opening_crawl,
      release_date: film?.properties?.release_date,
    }));

    res.send(movies);
  } else {
    return next(new ErrorResponse('No movies were returned from the SWAPI API'));
  }
};
