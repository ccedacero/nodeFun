const https = require('https');
const http = require('http');
const api = require('./api.json');
function printError(error) {
    console.error(error.message);
}
function printCityData(data) {
    const message = `You are located at ${data.coord.lon} | ${data.coord.lat} | ${data.name}`
    const temperature = `Current temperature ${data.main.temp}`;
    const feelsLike = `Feels like ${data.main.feels_like}`;
    const wind = `Current Wind Speed ${data.wind.speed}`;
    const visibility = `Visivility ${data.visibility}`;
    const finalMessage = `${message} \n ${temperature} \n ${feelsLike} \n ${wind} \n ${visibility}`;
    console.log(finalMessage);
}



function getCityWeather(city) {
    const query = isNaN(parseInt(city)) ? `q=${city}` : `zip=${city}`;
    try {
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${api.key}&units=imperial`, response => {
            try {
                if (response.statusCode === 200) {
                    let body = '';
                    response.on('data', data => {
                        body += data.toString();
                    })
                    response.on('end', () => {
                        try {
                            const cityData = JSON.parse(body);
                            // console.log(cityData.name);
                            printCityData(cityData)
                        } catch (error) {
                            printError(error);
                        }
                    })
                } else {
                    const message = `The location ${city} was not found. | (${http.STATUS_CODES[response.statusCode]})`;
                    const statusCodeError = new Error(message);
                    printError(statusCodeError)
                }
            } catch (error) {
                printError(error);
            }
        })
        request.on('error', error => printError(error));
    }
    catch (error) {
        printError(error)
    }
}

module.exports.get = getCityWeather;