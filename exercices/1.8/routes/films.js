const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const FILMS = [
  {
    id: 1,
    title: 'Fast and Furious',
    duration: 110,
    budget: 150,
    link: 'https://fr.wikipedia.org/wiki/Fast_and_Furious_(s%C3%A9rie_de_films)',
  },
  {
    id: 2,
    title: 'avatar',
    duration: 120,
    budget: 75,
    link: 'https://fr.wikipedia.org/wiki/Avatar_(film,_2009)',
  },
  {
    id: 3,
    title: 'Spider Man',
    duration: 90,
    budget: 40,
    link: 'https://fr.wikipedia.org/wiki/Spider-Man',
  },
  {
    id: 4,
    title: 'Status Update',
    duration: 94,
    budget: 5,
    link: 'https://en.wikipedia.org/wiki/Status_Update',
  },
];



router.get('/', (req, res) => {
  const orderByTime =
    req?.query['minimum-duration']?.includes('asc')
      ? req.query['minimum-duration']
      : undefined;
  let orderedFilms;
  // console.log(`order by ${orderByTime ?? 'not requested'}`);

  const films = parse(jsonDbPath, FILMS);

  if (orderByTime)
    orderedFilms = [...films].sort((a, b) => a.duration - b.duration);
  if (orderByTime === '-asc') orderedFilms = orderedFilms.reverse();

  // console.log('GET /film');
  return res.json(orderedFilms ?? films);
});

router.get('/:id', (req, res) => {
  // console.log(`GET /films/${req.params.id}`);

  const films = parse(jsonDbPath, FILMS);

  const indexOfFilmFound = films.findIndex((film) => film.id === req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0 ? req.body.budget : undefined;
  const {link} = req.body;

  if (!title || !duration || !budget) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = {
    id: nextId,
    title,
    duration,
    budget,
    link
  }

  films.push(newFilm);

  serialize(jsonDbPath, films);

  return res.json(newFilm);
})

router.delete('/:id', (req, res) => {
  // console.log(`PATCH /pizzas/${req.params.id}`);
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, FILMS);

  const indexFound = films.findIndex(film => film.id === id);

  if(indexFound < 0) return res.sendStatus(404);

  const filmRemovedFromFilms = films.splice(indexFound, 1);
  const filmRemoved = filmRemovedFromFilms[0];

  serialize(jsonDbPath, films);

  return res.json(filmRemoved);
})

router.patch('/:id', (req, res) => {
  // console.log(`PATCH /films/${req.params.id}`);

  const title = req?.body?.title;
  const budget = req?.body?.budget;

  // console.log('POST /films');

  if(!title && !budget || title?.length === 0 || budget?.length === 0) return res.sendStatus(400);

  const films = parse(jsonDbPath, FILMS);
  const id = Number(req.params.id);

  const indexFound = films.findIndex(film => film.id === id);

  if(indexFound < 0) return res.sendStatus(404);

  const updatedFilm = {...films[indexFound], ...req.body};

  films[indexFound] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
})

module.exports = router;
