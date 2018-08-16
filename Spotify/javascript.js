$(document).ready(function () {

    var cors = "https://cors-anywhere.herokuapp.com/"
    var baseUrl = "https://api.spotify.com/v1"
    var client_id = '3a13316200434809bcc4a3795fc632dc'; // Your client id
    var client_secret = '16d4345bbbeb4cf6b67439e2497ca9f3'; // Your secret

    // var request = require('request'); // "Request" library
    // your application requests authorization
    // var authOptions = {
    //     url: 'https://accounts.spotify.com/api/token',
    //     headers: {
    //         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //     },
    //     form: {
    //         grant_type: 'client_credentials'
    //     },
    //     json: true
    // };

    // request.post(authOptions, function (error, response, body) {
    //     if (!error && response.statusCode === 200) {

    //         // use the access token to access the Spotify Web API
    //         var token = body.access_token;
    //         var options = {
    //             url: 'https://api.spotify.com/v1/users/jmperezperez',
    //             headers: {
    //                 'Authorization': 'Bearer ' + token
    //             },
    //             json: true
    //         };
    //         request.get(options, function (error, response, body) {
    //             console.log(body);
    //         });
    //     }
    // });



    $.ajax({
        url: cors + baseUrl +
            method: "POST",
        headers: {
            'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret),
        },
        data: {
            contentType: 'application/x-www-form-urlencoded',
            grant_type: 'client_credentials'
        },
        success: function (result) {
            //called when successful
            console.log('success');
        },

        error: function (result) {
            //called when there is an error
            console.log(result);
        }
        // dataType: "json"
    }).then(function (response) {
        console.log(response);
        var token = response.access_token;

        $.ajax({
            url: "https://accounts.spotify.com/api/token",
            method: "GET",
            headers: {
                'Authorization': 'Bearer' + client_id + ":" + client_secret
            },
            form: {
                grant_type: 'client_credentials'
            },
            dataType: json
        }).then(function (response) {
            console.log(response);
        })
    })
})