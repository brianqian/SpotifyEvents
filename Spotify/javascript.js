$(document).ready(function () {

    var cors = "https://cors-anywhere.herokuapp.com/"
    var baseUrl = "https://api.spotify.com/v1"
    var client_id = '3a13316200434809bcc4a3795fc632dc'; // Your client id
    var client_secret = '16d4345bbbeb4cf6b67439e2497ca9f3'; // Your secret

    var request = require('request'); // "Request" library
    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/users/jmperezperez',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function (error, response, body) {
                console.log(body);
            });
        }
    });






})