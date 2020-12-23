const https = require('https');
const http = require('http');

// print error 
function printError(error) {
    console.error(error.message);
}

function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} badge(s) and a total of ${points} in JavaScript`
    console.log(message);
}

function get(username) {
    try {
        const request = https.get(`https://teamtreehouse.com/${username}.json`,
            response => {
                if (response.statusCode === 200) {
                    // console.log(response.statusCode)
                    let body = '';
                    // read data
                    response.on('data', data => {
                        body += data.toString();
                    });
                    response.on('end', () => {
                        try {
                            const profile = JSON.parse(body);
                            // console.dir(profile);
                            printMessage(username, profile.badges.length, profile.points.JavaScript)
                            // print result data
                        } catch (error) {
                            printError(error);
                        }
                    });
                } else {
                    const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                    const statusCodeError = new Error(message);
                    printError(statusCodeError)
                }
            })
        request.on('error', error => console.error(`Problem with request: ${error.message}`))
    } catch (error) {
        printError(error)
    }
}

module.exports.get = get;