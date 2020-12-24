const express = require('express');
const router = express.Router();
const { recipes } = require('../data/data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 1. Pass all recipe data to 'index' template
  res.render('index');
});

/* GET recipe page. */
router.get('/recipes/:id', function(req, res, next) {
  const recipeId = req.params.id;
  const recipe = recipes.find( ({ id }) => id === +recipeId );
  
  if (recipe) {
    // 2. Pass the recipe data to the 'recipe' template
    res.render('recipe');
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
