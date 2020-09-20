const express = require('express');
const router = express.Router();
// below is the same as -> const data = require('../data/flashcardData.json').data;
const { data } = require('../data/flashcardData.json');
// below is the same as -> const cards = data.cards;
const { cards } = data;

router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashcardId}`);
})

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if ( !side ) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name, side };

  if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer'
  } else if (side === 'answer') {
    templateData.sideToShow = 'question'
  }

  res.render('card', templateData);
});

module.exports = router;
