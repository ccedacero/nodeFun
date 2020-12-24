const express = require('express');

const app = express();


app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/cards', (req, res) => {
    // res.locals.prompt = 
    res.render('card', { prompt: "Who is buried in Grant's tombs" })
})

app.listen(3000, () => {
    console.log('running on port 3000');
})


