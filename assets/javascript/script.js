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
        $("#eventList").empty();
        events = result.events;
        for (var i = 0; i < events.length; i++) {
            var eventDiv = $("<div class='event-card'>");
            var eventText = $("<div class='event-card-text'>");
            var eventInterface = $("<div class='interface-e'>");
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

                var image = $("<img>");
                // image.attr("src", performers[i].image ? performers[i].image : "https://via.placeholder.com/350x150");
                // if (!(performers[i].image)) {
                //     continue;
                // }

                image.attr("src", performers[i].image);
                var name = $("<p>");
                name.text(performers[i].short_name);
                artistText.append(name);
                // artistDiv.append(image);
                var playButton = $("<div class='play'>");
                artistInterface.append(playButton);
                artistDiv.attr("data-id", performers[i].id);
                artistDiv.append(artistText, artistInterface);
                $("#artistList").append(artistDiv);

            }
        })
    })
    $(document).on("click", ".artist-card", function () {
        currentArtist = $(this).attr("data-id");
        getEvents(currentArtist);
    })

    $(document).on("click", ".play", function (e) {
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        $(".events").html("<button id='backToEvents'>X</button><p>Spotify Embed Player</p>");
    });

    $(document).on("click", "#backToEvents", function () {
        getEvents(currentArtist);
    });

});