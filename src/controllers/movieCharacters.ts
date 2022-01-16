import { RequestHandler } from 'express';
import axios from 'axios';

const getCharacters = async (id: string) => {
  const movieResponse = await axios.get(`${process?.env?.SWAPI_URL}/films/${id}`);
  const characters = movieResponse?.data?.result?.properties?.characters;
  return characters;
};

export const getMovieCharacters: RequestHandler = async (req, res) => {
  const { movieID } = req.params;

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
  // validate req.params too
  // sort values
  // filter values
  // Add link to movies for 1 movie
  // delete these comments

  res.send(charactersData);
};
