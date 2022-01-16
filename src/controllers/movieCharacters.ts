import { RequestHandler } from 'express';
import axios from 'axios';
import lodash from 'lodash';

import ErrorResponse from '../utils/errorResponse';

type Character = {
  gender: string;
};

const getCharacters = async (id: string) => {
  const movieResponse = await axios.get(`${process?.env?.SWAPI_URL}/films/${id}`);
  const characters = movieResponse?.data?.result?.properties?.characters;
  return characters;
};

const filterByGender = (characters: Character[], gender: string) => {
  if (gender) {
    const filteredCharacters = characters.filter((character: Character) => character.gender === gender);
    return filteredCharacters;
  }

  return characters;
};

const sortCharacters = (characters: Character[], sortParameter: string, sortOrder: string) => {
  if (sortOrder === 'dsc') {
    return lodash.sortBy(characters, [sortParameter]).reverse();
  }

  return lodash.sortBy(characters, [sortParameter]);
};

export const getMovieCharacters: RequestHandler = async (req, res, next) => {
  const { movieID } = req.params;
  const { sort, sort_order, gender } = req.query;

  if (sort_order && !sort) {
    return next(new ErrorResponse('In order to use sort_order, you need to supply the sort query too.'));
  }

  const characters = await getCharacters(movieID);

  const characterPromisesArray = characters.map((singleCharacter: string) => axios.get(singleCharacter));

  const resCharacters = await Promise.all(characterPromisesArray);
  const charactersData = resCharacters.map((resCharacter) => {
    const temp = { ...resCharacter?.data?.result?.properties };
    delete temp?.url;
    delete temp?.homeworld;
    delete temp?.homeworld;
    delete temp?.created;
    delete temp?.edited;

    return temp;
  });

  // add express validator to validate inputs from query params
  // checkout lodash
  // req.query.firstName
  // filter values
  // sort values
  // gender
  // delete these comments

  let data = filterByGender(charactersData, gender as string);
  data = sortCharacters(data, sort as string, sort_order as string);

  res.send(data);
};
