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

function getEvents(id) {
    $.ajax({
        url: cors + baseUrl + event + "?performers.id=" + id + clientId,
        method: "GET"
    }).then(function (result) {
        console.log(result);
        $(".events").empty();
        events = result.events;
        for (var i = 0; i < events.length; i++) {
            var eventDiv = $("<div class='event'>");
            var image = $("<img>");
            image.attr("src", events[i].performers[0].image);
            var venue = $("<p>").text(events[i].venue.name);
            var address = $("<p>").text(events[i].venue.address + ", " + events[i].venue.display_location);
            var title = $("<p>").text(events[i].title);
            var time = $("<p>").text(events[i].datetime_local)
            eventDiv.append(title);
            eventDiv.append(venue);
            eventDiv.append(address);
            eventDiv.append(time);
            $(".events").append(eventDiv);
        }
    })
}

$(document).ready(function () {


    $("#submit").on("click", function (event) {

        event.preventDefault();
        $(".artists").empty();
        search = $("#event").val();
        $.ajax({
            url: cors + baseUrl + performer + "?q=" + search + clientId,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            console.log(cors + baseUrl + event + "?q=" + search + clientId);
            performers = response.performers;

            for (var i = 0; i < performers.length; i++) {

                var artistDiv = $("<div class='selectArtist' >");
                var image = $("<img>");
                // image.attr("src", performers[i].image ? performers[i].image : "https://via.placeholder.com/350x150");
                if (!(performers[i].image)) {
                    continue;
                }
                image.attr("src", performers[i].image);
                var name = $("<span>");
                name.text(performers[i].short_name);
                // artistDiv.append(image);
                var playButton = $("<div class='play'>");
                artistDiv.append(name);
                artistDiv.attr("data-id", performers[i].id);
                artistDiv.append(playButton);
                $(".artists").append(artistDiv);
            }
        })
    })
    $(document).on("click", ".selectArtist", function () {
        currentArtist = $(this).attr("data-id");
        getEvents(currentArtist);
    })

    $(document).on("click", ".play", function (e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        $(".events").html("<button id='backToEvents'>X</button><p>Spotify Embed Player</p>");
    });

    $(document).on("click", "#backToEvents", function() {
        getEvents(currentArtist);
    });

    //?performers.id



})