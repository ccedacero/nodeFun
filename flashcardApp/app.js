const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());


app.use((req, res, next) => {
    req.message = 'This message made it!';
    next();
})

app.use((req, res, next) => {
    console.log(req.message);
    next();
})



app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (!name) {
        res.redirect('/hello');
    } else {
        res.render('index', { name });
    }
})

app.post('/signout', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
})

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (!name) {
        res.render('hello', { name: req.cookies.username });
    } else {
        res.redirect('/')
    }
})

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/');

})

app.get('/cards', (req, res) => {
    // res.locals.prompt = 
    res.render('card', { prompt: "Who is buried in Grant's tombs" })
})

app.listen(3000, () => {
    console.log('running on port 3000');
})


