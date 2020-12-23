// shoud handle zip or city and state 
const weather = require('./weather');
const location = process.argv.slice(2);
weather.get(location)
// const location = process.argv.slice(2).join('');


