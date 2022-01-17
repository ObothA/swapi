import { RequestHandler } from 'express';

import prisma from '../config/client';

export const addComment: RequestHandler = async (req, res) => {
  const { movieId, comment } = req.body;

  const newComment = await prisma.comments.create({
    data: {
      movie_id: movieId,
      comment,
    },
  });

  res.send({
    success: true,
    message: 'Comment added successfully.',
    data: newComment,
  });
};
