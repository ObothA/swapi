import { RequestHandler } from 'express';
import axios from 'axios';

import ErrorResponse from '../utils/errorResponse';
import prisma from '../config/client';

type Movie = {
  title: string;
  string: string;
  release_date: string;
  opening_crawl: string;
  number_of_comments: string;
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
  const movieListPromise = axios.get(`${process?.env?.SWAPI_URL}/films`);
  const movieCommentsPromise = prisma.comments.findMany();

  const [movieResponse, movieComments] = await Promise.all([movieListPromise, movieCommentsPromise]);

  const rawMovies = movieResponse?.data?.result;

  if (rawMovies) {
    const movies: Movie[] = rawMovies?.map((film: Film) => ({
      id: film?.uid,
      title: film?.properties?.title,
      opening_crawl: film?.properties?.opening_crawl,
      release_date: film?.properties?.release_date,
      number_of_comments: movieComments.filter((comment) => comment?.movie_id === film?.uid).length,
      url: `/movies/${film?.uid}`,
    }));

    res.send(movies);
  } else {
    return next(new ErrorResponse('No movies were returned from the SWAPI API'));
  }
};

export const getMovie: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  const moviePromise = await axios.get(`${process?.env?.SWAPI_URL}/films/${id}`);
  const movieCommentsPromise = prisma.comments.findMany({
    where: {
      movie_id: id,
    },
  });

  const [movieResponse, movieCommentsResponse] = await Promise.all([moviePromise, movieCommentsPromise]);

  const rawMovie: Film = movieResponse?.data?.result;

  if (rawMovie) {
    const movie = {
      id: rawMovie?.uid,
      title: rawMovie?.properties?.title,
      opening_crawl: rawMovie?.properties?.opening_crawl,
      release_date: rawMovie?.properties?.release_date,
      number_of_comments: movieCommentsResponse.length,
    };

    res.send(movie);
  } else {
    return next(new ErrorResponse('No movie was returned from the SWAPI API'));
  }
};
