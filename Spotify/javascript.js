$(document).ready(function () {

    var cors = "https://cors-anywhere.herokuapp.com/"
    var baseUrl = "https://api.spotify.com/v1/"
    var client_id = '3a13316200434809bcc4a3795fc632dc'; // Your client id
    var client_secret = '16d4345bbbeb4cf6b67439e2497ca9f3'; // Your secret
    var artistPlaylistLink;
    $.ajax({
        url: cors + "https://accounts.spotify.com/api/token",
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
    }).then(function (response) {
        var token = response.access_token;
        //search Param should be passed a value that equals seatgeekapi.performers[0]
        var searchParam = "artists/21mKp7DqtSNHhCAU2ugvUw";

        $.ajax({
            url: cors + baseUrl + searchParam,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
                console.log('success');
            },

            error: function (result) {
                //called when there is an error
                console.log(result);
            }
        }).then(function (response) {
            console.log(response);
            //this link goes into the iframe
            artistPlaylistLink = response.uri;

        })
    })
})