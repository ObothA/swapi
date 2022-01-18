import { RequestHandler } from 'express';

import prisma from '../config/client';

export const addComment: RequestHandler = async (req, res) => {
  const { movieId, comment } = req.body;

  const newComment = await prisma.comments.create({
    data: {
      movie_id: movieId,
      comment,
      created_at: new Date().toUTCString(),
      public_ipv6_address: req.ip,
    },
  });

  res.send({
    success: true,
    message: 'Comment added successfully.',
    data: newComment,
  });
};

export const getMovieComments: RequestHandler = async (req, res) => {
  const { movie_id } = req.query;

  const movieComments = await prisma.comments.findMany({
    where: {
      movie_id: movie_id as string,
    },
  });

  res.send({
    success: true,
    count: movieComments.length,
    data: movieComments,
  });
};
