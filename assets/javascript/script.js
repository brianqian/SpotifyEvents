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
var autocomplete;
var geocoder;
var input = document.getElementById('locationInput');
var options = {
    componentRestrictions: {
        'country': 'us'
    },
    types: ['(cities)']
}

// =========
var autocomplete;
var geocoder; 
var input = document.getElementById('locationInput');
var options = {
    componentRestrictions: {'country':'us'},
    types: ['(regions)']
}
// ===========

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

        $.ajax({
            url: cors + spotifyBase + artistName + "&type=artist",
            method: "GET",
            dataType: "json",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {},
            error: function (result) {
                //called when there is an error
                console.log(result);
            }
        }).then(function (response) {
            console.log(response);
            $("#spotifyDiv").remove();
            var newDiv = $("<div id='spotifyDiv'>");
            if (!response.artists.items[0]) {
                console.log('2');
                newDiv.append("<p>Artist not found on Spotify!</p>")
                newDiv.css("flex", "3");
                $("#eventList").hide();
                $(".search-results").append(newDiv);
                return;
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

};



$(document).ready(function () {
// =============================
    autocomplete = new google.maps.places.Autocomplete(input,options);

    autocomplete = new google.maps.places.Autocomplete(input, options);


    $("#submitInput").on("click", function (event) {

        event.preventDefault();
<<<<<<< HEAD
// ==============================
=======
>>>>>>> e3e67d6bfe7a793eb0306cbbe0bd8e9e1f41d2f9
        var location = autocomplete.getPlace();
        geocoder = new google.maps.Geocoder();
        lat = location['geometry']['location'].lat();
        lng = location['geometry']['location'].lng();
<<<<<<< HEAD
        var latlng = new google.maps.LatLng(lat,lng);

        geocoder.geocode({'latLng': latlng}, function(results)
        {
            for(i = 0; i< results.length; i++)
            {
                for(var j=0; j<results[i].address_components.length; j++)
                {
                    for(var k=0; k<results[i].address_components[j].types.length; k++)
                    {
                        if(results[i].address_components[j].types[k] == "postal_code")
                        {
                            zipcode = results[i].address_components[j].short_name;
                            console.log(zipcode);
                        }
=======
        var latlng = new google.maps.LatLng(lat, lng);

        geocoder.geocode({
            'latLng': latlng
        }, function (results) {
            console.log(results[0].address_components);

            for (var i = 0; i < results[0].address_components.length; i++) {
                for (var k = 0; k < results[0].address_components[i].types.length; k++) {
                    if (results[0].address_components[i].types[k] == "postal_code") {
                        console.log(results[0].address_components[i])
                        zipcode = results[0].address_components[i].long_name;
                        console.log(zipcode);
>>>>>>> e3e67d6bfe7a793eb0306cbbe0bd8e9e1f41d2f9
                    }
                }
            }
        })
<<<<<<< HEAD
// =============
=======
>>>>>>> e3e67d6bfe7a793eb0306cbbe0bd8e9e1f41d2f9
        $("#artistList").empty();
        search = $("#eventInput").val();
        $("#eventList").show();
        $("#spotifyDiv").remove();
        console.log(search);
        $.ajax({
            url: cors + baseUrl + performer + "?q=" + search + clientId,
            method: "GET"
        }).then(function (response) {
            console.log("performer", response);
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
                playButton.attr("data-name", performers[i].short_name)

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
                artistText.attr("data-id", performers[i].id);
                artistDiv.append(artistText, artistInterface);
                $("#artistList").append(artistDiv);

            }
        })

    })
    $(document).on("click", ".artist-card-text", function () {
        $("#eventList").show();
        $("#spotifyDiv").remove();
        currentArtist = $(this).attr("data-id");
        getEvents(currentArtist);

    })

    $(document).on("click", ".playButton", function (e) {
        currentArtistName = $(this).attr("data-name");
        getSpotify(currentArtistName);


    });

    $(document).on("click", "#backToEvents", function () {
        $("#eventList").show();
        $("#spotifyDiv").remove();
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
                database.ref("/users/" + userId).update({
                    [eventId]: eventObj
                })
            }
        }
    })
});