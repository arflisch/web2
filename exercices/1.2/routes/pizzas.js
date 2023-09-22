var express = require('express');
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: '4 fromages',
    content: 'Gruyère, Sérac, Appenzel, Gorgonzola, Tomates',
  },
  {
    id: 2,
    title: 'Vegan',
    content: 'Tomates, Courgettes, Oignons, Aubergines, Poivrons',
  },
  {
    id: 3,
    title: 'Vegetarian',
    content: 'Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives',
  },
  {
    id: 4,
    title: 'Alpage',
    content: 'Gruyère, Mozarella, Lardons, Tomates',
  },
  {
    id: 5,
    title: 'Diable',
    content: 'Tomates, Mozarella, Chorizo piquant, Jalapenos',
  },
];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
let nbrGetRequest = 0;

router.get('/', (req, res, next) => {
  if(req.get){
    nbrGetRequest++;
  }
  console.log('Request counter: \nGET /pizzas : ' , nbrGetRequest);
   res.json(MENU);
});



module.exports = router;
