const express = require('express');
const router = express.Router();
const { data } = require('./data/flashCardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    const { id } = req.params;
    const cardCount = cards.length;
    const cardId = Math.floor(Math.random() * cardCount);
    res.redirect(`/cards/${cardId}?side=question`);
})
router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const text = cards[id][side];
    const { hint } = cards[id];
    const name = req.cookies.username;

    const templateData = { id, text, name };

    if (side === 'question') {
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
        templateData.hint = hint;
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    res.render('card', templateData)
})

module.exports = router; 