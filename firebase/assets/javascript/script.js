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
var eventObj = {};
var eventsObj = {};




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
            eventInterface.append("<i class='fas fa-plus'></i>");
            console.log('finished');

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
                artistDiv.append(artistText, artistInterface);
                $("#artistList").append(artistDiv);

            }
        })
    })
    $(document).on("click", ".artist-card", function () {
        currentArtist = $(this).attr("data-id");
        getEvents(currentArtist);
    })

    $(document).on("click", ".playButton", function (e) {
        console.log('test');
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        $("#eventList").html("<button id='backToEvents'>X</button><p>Spotify Embed Player</p>");
    });

    $(document).on("click", "#backToEvents", function () {
        getEvents(currentArtist);
    });

    $(document).on("click", ".interface-e", function () {
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
    })

    $(document).on("click", ".addButton", function () {
        if (userId) {
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
    })

});


/**
 * for (var key in validation_messages) {
    // skip loop if the property is from prototype
    if (!validation_messages.hasOwnProperty(key)) continue;

    var obj = validation_messages[key];
    for (var prop in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;

        // your code
        alert(prop + " = " + obj[prop]);
    }
} */