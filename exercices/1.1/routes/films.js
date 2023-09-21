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

module.exports = router;
