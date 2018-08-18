var baseUrl = "https://api.seatgeek.com/2";
var event = "/events"
var venue = "/venue";
var performer = "/performers";
var clientId = "&client_id=MTI3MzAwODN8MTUzNDQ0MTQyMC4yNg";
var search;
var cors = "https://cors-anywhere.herokuapp.com/"
var geoip = "&geoip=";
var zipcode;
var performers = [];
var events;
var currentArtist;
var currentArtistName;
var artistPlaylistLink;


function getEvents(id) {
    console.log('starting getEvents');
    $.ajax({
        url: cors + baseUrl + event + "?performers.id=" + id + clientId,
        method: "GET"
    }).then(function (result) {
        console.log(result);
        $("#eventList").empty();
        events = result.events;
        for (var i = 0; i < events.length; i++) {
            var eventDiv = $("<div class='event-card'>");
            var eventText = $("<div class='event-card-text'>");
            var eventInterface = $("<div class='interface-e'>");
            eventInterface.append("<i class='fas fa-plus'></i>");
            console.log('finished');

            var image = $("<img>");
            image.attr("src", events[i].performers[0].image);
            var venue = $("<p>").text(events[i].venue.name);
            var address = $("<p>").text(events[i].venue.address + ", " + events[i].venue.display_location);
            var title = $("<h3>").text(events[i].title);
            var time = $("<p>").text(events[i].datetime_local)
            eventText.append(title, venue, address, time);
            eventDiv.append(eventText, eventInterface);
            $("#eventList").append(eventDiv);
        }
    })
}

function getSpotify(artistName) {
    var spotifyBase = "https://api.spotify.com/v1/search?query="
    var client_id = "3a13316200434809bcc4a3795fc632dc";
    var client_secret = "16d4345bbbeb4cf6b67439e2497ca9f3"

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
            console.log('success');
        },
        error: function (result) {
            console.log(result);
        }
    }).then(function (response) {
        var token = response.access_token;
        //search Param should be passed a value that equals seatgeekapi.performers[0]

        $.ajax({
            url: cors + spotifyBase + artistName + "&type=artist",
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
            //this link goes into the iframe
            artistPlaylistLink = response.uri;
            console.log('response uri assigned');

        })
    })

}

$(document).ready(function () {

    $("#submitInput").on("click", function (event) {

        event.preventDefault();
        $("#artistList").empty();
        search = $("#eventInput").val();
        console.log(search);
        $.ajax({
            url: cors + baseUrl + performer + "?q=" + search + clientId,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(cors + baseUrl + event + "?q=" + search + clientId);
            performers = response.performers;


            for (var i = 0; i < performers.length; i++) {
                var artistDiv = $("<div class='artist-card'>");
                var artistText = $("<div class='artist-card-text'>");
                var artistInterface = $("<div class='interface-a'>");
                var playButton = $("<div class='playButton'>")
                var addButton = $("<div class='addButton'>");
                addButton.append("<i class='fas fa-plus'></i>");
                playButton.append("<i class='fas fa-play'></i>");
                artistInterface.append(addButton, playButton);

                var image = $("<img>");
                // image.attr("src", performers[i].image ? performers[i].image : "https://via.placeholder.com/350x150");
                if (!(performers[i].image)) {
                    continue;
                }

                image.attr("src", performers[i].image);
                var name = $("<p>");
                name.text(performers[i].short_name);
                artistText.append(name);
                // artistDiv.append(image);
                artistDiv.attr("data-id", performers[i].id);
                artistDiv.attr("data-name", performers[i].short_name)
                artistDiv.append(artistText, artistInterface);
                $("#artistList").append(artistDiv);

            }
        })

    })
    $(document).on("click", ".artist-card", function () {
        currentArtist = $(this).attr("data-id");
        currentArtistName = $(this).attr("data-name");
        getEvents(currentArtist);
        getSpotify(currentArtistName);


    })

    $(document).on("click", ".playButton", function (e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        $("#eventList").html("<button id='backToEvents'>X</button><p>Spotify Embed Player</p>");
    });

    $(document).on("click", "#backToEvents", function () {
        getEvents(currentArtist);
    });

});