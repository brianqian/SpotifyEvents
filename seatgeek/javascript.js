var baseUrl = "https://api.seatgeek.com/2";
var events = "/events"
var venue = "/venue";
var performer = "/performers";
var clientId = "&client_id=MTI3MzAwODN8MTUzNDQ0MTQyMC4yNg";
var query = "?q=";
var cors = "https://cors-anywhere.herokuapp.com/"
var geoip = "&geoip=";
var zipcode;



$(document).ready(function() {


    $("#submit").on("click", function(event) {

        event.preventDefault();
        var search = $("#event").val();
        console.log(search);
        query = query + search;
        $.ajax({
            url: cors + baseUrl + events + query + clientId,
            method: "GET"
        }).then(function(response) {
            console.log(response);
        })
    })







})