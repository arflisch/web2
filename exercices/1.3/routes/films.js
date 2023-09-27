var express = require('express');
var router = express.Router();


const FILMS = [
  {
    id: 1,
    title: 'Fast and Furious',
    duration: 120,
    budget: 150,
    link: 'https://fr.wikipedia.org/wiki/Fast_and_Furious_(s%C3%A9rie_de_films)',
  },
  {
    id: 2,
    title: 'avatar',
    duration: 110,
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
    duration: 90,
    budget: 5,
    link: 'https://en.wikipedia.org/wiki/Status_Update',
  },
];

router.get('/', function(req, res, next) {
  console.log('GET /films');
  res.json(FILMS);
});

router.get('/', (req, res, next) => {
  const orderByTime =
    req?.query?.['minimum-duration']?.includes('asc')
      ? req.query['minimum-duration']
      : undefined;
  let orderedFilms;
  console.log(`order by ${orderByTime ?? 'not requested'}`);
  if (orderByTime)
    orderedFilms = [...FILMS].sort((a, b) => a.duration.localeCompare(b.duration));
  if (orderByTime === 'desc') orderedFilms = orderedFilms.reverse();

  console.log('GET /film');
  res.json(orderedFilms ?? FILMS);
});

router.get('/:id', (req, res) => {
  console.log(`GET /films/${req.params.id}`);

  const indexOfFilmFound = FILMS.findIndex((film) => film.id == req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(FILMS[indexOfFilmFound]);
});

module.exports = router;
