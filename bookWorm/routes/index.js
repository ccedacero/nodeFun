var express = require('express');
var router = express.Router();
const user = require('../models/user');

// GET /
router.get('/', function (req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', function (req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function (req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Sign Up' })
})

router.post('/register', (req, res, next) => {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword) {
    //confirm that user password matches
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Password does not match');
      err.status = 400;
      return next(err);
    }
    const userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    };
    // use schema's create method to insert doc into Mongo
    user.create(userData, (err, user) => {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/profile');
      }
    })
  } else {
    const err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

module.exports = router;
