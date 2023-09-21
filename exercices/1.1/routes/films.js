var express = require('express');
var router = express.Router();


const FILMS = [
  {
    id: 1,
    title: 'Fast and Furious',
    duration: 220,
    budget: 150,
    link,
  },
  {
    id: 2,
    title,
    duration,
    budget,
    link,
  },
  {
    id: 3,
    title,
    duration,
    budget,
    link,
  },
  {
    id: 4,
    title,
    duration,
    budget,
    link,
  },
];

router.get('/', function(req, res, next) {
  console.log('GET /films');
  res.json(FILMS);
});

module.exports = router;
