$(document).ready(function () {

            var cors = "https://cors-anywhere.herokuapp.com/"
            var baseUrl = "https://api.spotify.com/v1/"
            var apiKey = "M2ExMzMxNjIwMDQzNDgwOWJjYzRhMzc5NWZjNjMyZGM6MTZkNDM0NWJiYmViNGNmNmI2NzQzOWUyNDk3Y2E5ZjM="
            var artistPlaylistLink;
            // $.ajax({
            //     url: cors + "https://accounts.spotify.com/api/token",
            //     method: "POST",
            //     headers: {
            //         'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret),
            //     },
            //     data: {
            //         contentType: 'application/x-www-form-urlencoded',
            //         grant_type: 'client_credentials'
            //     },
            //     success: function (result) {
            //         //called when successful
            //         console.log('success');
            //     },

            //     error: function (result) {
            //         //called when there is an error
            //         console.log(result);
            //     }
            // }).then(function (response) {
            //     var token = response.access_token;
            //     //search Param should be passed a value that equals seatgeekapi.performers[0]
            //     var searchParam = "artists/21mKp7DqtSNHhCAU2ugvUw";

            //     $.ajax({
            //         url: cors + baseUrl + searchParam,
            //         method: "GET",
            //         headers: {
            //             'Authorization': 'Bearer ' + token
            //         },
            //         success: function (result) {
            //             console.log('success');
            //         },

            //         error: function (result) {
            //             //called when there is an error
            //             console.log(result);
            //         }
            //     }).then(function (response) {
            //         console.log(response);
            //         //this link goes into the iframe
            //         artistPlaylistLink = response.uri;

            //     })
            // })

            $.ajax({


                url: cors + "https://accounts.spotify.com/authorize?client_id" + apiKey +
                    "&redirect_uri=" + redirect_uri +
                    "&scope=" +
                    method: "GET",
                headers: {},
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
            }).then(function (response) {})