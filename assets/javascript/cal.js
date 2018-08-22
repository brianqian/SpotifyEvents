function addToCalendar() {
    for (prop in userEvents) {

        var noRepeat = true;
        var convertedTime = userEvents[prop]["datetime_local"];
        var tempObj = {
            title: userEvents[prop]["short_title"],
            start: moment(convertedTime).format("YYYY-MM-DD"),
            id: userEvents[prop]["id"],
            venueAddress: userEvents[prop]['venue']['address'] + ", " + userEvents[prop]['venue']['extended_address'],
            venueName: userEvents[prop]['venue']['name'],
            time: moment(userEvents[prop]['datetime_local']).format("h:mm A"),
            url: userEvents[prop]['url'],
            highestPrice: userEvents[prop]['stats']['highest_price'],
            lowestPrice: userEvents[prop]['stats']['lowest_price'],
            ticketsLeft: userEvents[prop]['stats']['listing_count']
        }

        for (var i = 0; i < calendarSource.length; i++) {
            if (tempObj.id == calendarSource[i].id) {
                noRepeat = false;
            }
        }
        if (noRepeat) {
            calendarSource.push(tempObj);
        }
    }

    $("#calendar1").fullCalendar('removeEvents');

    for (var i = 0; i < calendarSource.length; i++) {
        $('#calendar1').fullCalendar('renderEvent', calendarSource[i], [true])
    }

}



var today = moment().format("YYYY-MM-YY");
console.log(today);
var currentEventId;
var calendarView = true;
$(document).ready(function () {

    $('#calendar1').fullCalendar({
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: calendarSource,
        eventClick: function (event, jsEvent, view) {
            currentEventId = event.id;
            console.log(event);
            $('#modalTitle').html(event.title);
            $('#Venue').html("<p>Venue: " + event.venueName + "</p><p>" + event.venueAddress + "</p>");
            $("#Time").html("<p>Time: " + event.time + "</p>");
            $("#Price").html("<p>Tickets Left: " + event.ticketsLeft +
                "</p><p>Highest Price: " + event.highestPrice +
                "</p><p>Lowest Price: " + event.lowestPrice + "</p>");
            $('#eventUrl').attr('href', event.url);
            $('#fullCalModal').modal();
            return false;
        },

    });

    $("#removeEvent").on("click", function () {

        $("#calendar1").fullCalendar('removeEvents', currentEventId)
        var temp = database.ref("/users/" + userId);
        temp.child(currentEventId).remove();
        delete userEvents[currentEventId];
        var index = 0;
        for (var i = 0; i < calendarSource.length; i++) {
            if (calendarSource[i].id === currentEventId) {
                index = i;
            }
        }
        calendarSource.splice(index, 1);

    })
    $("#reformat").on("click", function () {
        console.log("why not");
        if ((calendarView == true)) {
            $('#calendar1').fullCalendar(
                'changeView', 'listMonth'
            );
            calendarView = false;
        } else {
            $('#calendar1').fullCalendar(
                'changeView', 'month'
            );
            calendarView = true;
        }
    })
    $("#button3").on("click", function () {
        $("#calendar1").fullCalendar('removeEvents');
        userEvents = {};
        calendarSource = [];
        var temp = database.ref("/users/" + userId);
        temp.remove();

    });
});