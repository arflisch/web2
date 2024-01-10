const path = require('node:path');
const { parse, serialize } = require('../utils/json');

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

function readAllFilms(orderBy) {
    const orderByTime = orderBy?.includes('asc') ? orderBy : undefined;
    let orderedMenu;
    const films = parse(jsonDbPath, FILMS);
    if (orderByTime)
      orderedMenu = [...films].sort((a, b) => a.title.localeCompare(b.title));
    if (orderByTime === '-asc') orderedMenu = orderedMenu.reverse();
  
    const allFilmsPotentiallyOrderd = orderedMenu ?? films;
    return allFilmsPotentiallyOrderd;
  }
  
  function readOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, FILMS);
    const indexOfPizzaFound = films.findIndex((pizza) => pizza.id === idNumber);
    if (indexOfPizzaFound < 0) return undefined;
  
    return films[indexOfPizzaFound];
  }
  
  function createOneFilm(title, duration, budget, link) {
    const films = parse(jsonDbPath, FILMS);
  
    const createdFilm = {
      id: getNextId(),
      title,
      duration,
      budget,
      link
    };
  
    films.push(createdFilm);
  
    serialize(jsonDbPath, films);
  
    return createdFilm;
  }
  
  function getNextId() {
    const films = parse(jsonDbPath, FILMS);
    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = films[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }
  
  function deleteOneFilm(id) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, FILMS);
    const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;
    const deletedFilms = films.splice(foundIndex, 1);
    const deletedFilm = deletedFilms[0];
    serialize(jsonDbPath, films);
  
    return deletedFilm;
  }
  
  function updateOneFilm(id, propertiesToUpdate) {
    const idNumber = parseInt(id, 10);
    const films = parse(jsonDbPath, FILMS);
    const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
    if (foundIndex < 0) return undefined;
  
    const updatedFilm = { ...films[foundIndex], ...propertiesToUpdate };
  
    films[foundIndex] = updatedFilm;
  
    serialize(jsonDbPath, films);
  
    return updatedFilm;
  }
  
  module.exports = {
    readAllFilms,
    readOneFilm,
    createOneFilm,
    deleteOneFilm,
    updateOneFilm,
  };
  