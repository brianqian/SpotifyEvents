var baseUrl = "https://api.seatgeek.com/2";
var event = "/events"
var venue = "/venue";
var performer = "/performers";
var clientId = "&client_id=MTI3MzAwODN8MTUzNDQ0MTQyMC4yNg";
var cors = "https://cors-anywhere.herokuapp.com/"
var geoip = "&geoip=";
var zipcode;
var performers = [];
var events;
var currentArtist;
var eventObj = {};
var eventsObj = {};
var currentArtistName;
var userEvents = {};



function getEvents(id) {
    $.ajax({
        url: cors + baseUrl + event + "?performers.id=" + id + clientId,
        method: "GET"
    }).then(function (result) {
        $("#eventList").empty();
        events = result.events;
        if (!events) {
            console.log("events empty: " + events);
        }
        for (var i = 0; i < events.length; i++) {
            var eventDiv = $("<div class='event-card'>");
            var eventText = $("<div class='event-card-text'>");
            var eventInterface = $("<div class='addButtonSingle'>");
            eventInterface.append("<i class='fas fa-plus'></i>");
            var image = $("<img>");
            image.attr("src", events[i].performers[0].image);
            var venue = $("<p>").text(events[i].venue.name);
            var address = $("<p>").text(events[i].venue.address + ", " + events[i].venue.display_location);
            var title = $("<h3>").text(events[i].title);
            var time = $("<p>").text(events[i].datetime_local)
            eventText.append(title, venue, address, time);
            eventInterface.attr('data-event', events[i].id);
            eventInterface.attr('data-index', i);
            eventDiv.append(eventText, eventInterface);
            $("#eventList").append(eventDiv);
        }
    })
}

function getSpotify(artistName) {
    var spotifyBase = "https://api.spotify.com/v1/search?query=";
    var client_id = "3a13316200434809bcc4a3795fc632dc";
    var client_secret = "16d4345bbbeb4cf6b67439e2497ca9f3";
    //Gets Client Credentials Token
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
        success: function (result) {},
        error: function (result) {
            console.log(result);
        }
    }).then(function (response) {
        var token = response.access_token;
        //Uses token to get Artist URI
        $.ajax({
            url: cors + spotifyBase + artistName + "&type=artist",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {},
            error: function (result) {
                console.log(result);
            }
        }).then(function (response) {
            console.log(response);
            $("#spotifyDiv").remove();
            var newDiv = $("<div id='spotifyDiv'>");
            if (!response.artists.items[0]) {
                newDiv.append("<p>Artist not found on Spotify!</p>")
                newDiv.css("flex", "3");
                $("#eventList").hide();
                $(".search-results").append(newDiv);

            } else {
                var artistURI = response.artists.items[0].uri;
                var embeddedPlayer = `<iframe src="https://open.spotify.com/embed?uri=${artistURI}" width="100%" height="90%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
                newDiv.append(`<button id='backToEvents'>X</button>` + embeddedPlayer);
                newDiv.css("flex", "3");
                $("#eventList").hide();
                $(".search-results").append(newDiv);
            }

        })
    })

}

$(document).ready(function () {

    $("#submitInput").on("click", function (event) {
        event.preventDefault();
        $("#artistList").empty();
        $("#eventList").show();
        $("#spotifyDiv").remove();
        var search = $("#eventInput").val();
        console.log("USER INPUT: " + search);

        //GET ARTISTS
        //ajax call to search artists, list them and assign data attrs.
        $.ajax({
            url: cors + baseUrl + performer + "?q=" + search + clientId,
            method: "GET"
        }).then(function (response) {
            console.log("performer", response);
            performers = response.performers;
            for (var i = 0; i < performers.length; i++) {
                if (!(performers[i].image)) {
                    continue;
                }
                var name = $("<p>");
                var artistDiv = $("<div class='artist-card'>");
                var artistText = $("<div class='artist-card-text'>");
                artistText.attr("data-id", performers[i].id);
                var artistInterface = $("<div class='interface'>");
                var playButton = $("<div class='playButton'>");
                playButton.attr("data-name", performers[i].short_name);
                var addButtonAll = $("<div class='addButtonAll'>");
                addButtonAll.attr('data-id', performers[i].id);

                addButtonAll.append("<i class='fas fa-plus'></i>");
                addButtonAll.hide();
                playButton.append("<i class='fas fa-play'></i>");
                artistInterface.append(addButtonAll, playButton);
                // var image = $("<img>");
                // image.attr("src", performers[i].image);
                // artistDiv.append(image);
                name.text(performers[i].short_name);
                artistText.append(name);

                artistDiv.append(artistText, artistInterface);
                $("#artistList").append(artistDiv);

            }
        })

    }); //END OF SUBMIT BUTTON CLICK

    $(document).on("click", ".artist-card-text", function () {
        currentArtist = $(this).attr("data-id");
        console.log(currentArtist);
        $("#eventList").show();
        $(".addButtonAll").hide();
        $(`[data-id=${currentArtist}]`).show();
        $("#spotifyDiv").remove();
        getEvents(currentArtist);
    });

    $(document).on("click", ".playButton", function (e) {
        currentArtistName = $(this).attr("data-name");
        getSpotify(currentArtistName);
    });

    $(document).on("click", ".addButtonAll", function () {

        if (userId && currentArtist === $(this).attr("data-id")) {
            for (var i = 0; i < events.length; i++) {
                var eventId = events[i].id;
                eventObj = {
                    datetime_local: events[i].datetime_local,
                    performers: events[i].performers,
                    short_title: events[i].short_title,
                    venue: events[i].venue,
                    stats: events[i].stats
                };
                userEvents[eventId] = eventObj;
                database.ref("/users/" + userId).update({
                    [eventId]: eventObj
                })
            }
        }
        console.log(userEvents);


    })

    $(document).on("click", ".addButtonSingle", function () {
        if (userId) {
            var eventId = $(this).attr('data-event');
            var index = $(this).attr('data-index');
            eventObj = {
                datetime_local: events[index].datetime_local,
                performers: events[index].performers,
                short_title: events[index].short_title,
                venue: events[index].venue,
                stats: events[index].stats
            };
            userEvents[eventId] = eventObj;
            database.ref("/users/" + userId).update({
                [eventId]: eventObj
            })
        }
        console.log("individual add: " + JSON.stringify(userEvents));

    });


    $(document).on("click", "#backToEvents", function () {
        $("#eventList").show();
        $("#spotifyDiv").remove();
    });



}); // END OF SCRIPT.JS