const express = require('express');
const {
    readAllTexts,
    readOneText,
    createOneText,
    deleteOneText,
    updateOneText
} = require('../models/texts');

const router = express.Router();

const levels = ["easy", "medium", "hard"];

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  let order = req?.query?.level;
  if (order != null)
  {
    order = String(req?.query?.level).toLowerCase();
    if(levels.indexOf(order) === -1) return res.sendStatus(400);
  }
  const allTextsPotentiallyOrderd = readAllTexts(order);

  return res.json(allTextsPotentiallyOrderd);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const foundText = readOneText(req.params.id);

  if(!foundText) return res.sendStatus(404);

  return res.json(foundText);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  const level = req?.body?.level?.length !== 0 ? req.body.level : undefined;

  if (!level || !content) return res.sendStatus(400); // error code '400 Bad request'
  if(levels.indexOf(level.toLowerCase()) === -1) return res.sendStatus(400);

  const createdText = createOneText(content, level);

  return res.json(createdText);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const deletedText = deleteOneText(req.params.id);

  if(!deletedText) return res.sendStatus(404);

  return res.json(deletedText);
});

// Update a pizza based on its id and new values for its parameters
router.patch('/:id', (req, res) => {
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;

  if (!content) return res.sendStatus(400);

  const updatedText = updateOneText(req.params.id, { content });

  if(!updatedText) return res.sendStatus(404);

  return res.json(updatedText);
});

module.exports = router;
