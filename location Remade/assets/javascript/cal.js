function addToCalendar() {
    for (prop in userEvents) {

        var noRepeat = true;
        var convertedTime = userEvents[prop]["datetime_local"];
        var tempObj = {
            title: userEvents[prop]["short_title"],
            start: moment(convertedTime).format("YYYY-MM-DD"),
            id: userEvents[prop]["id"]
        }

        for (var i = 0; i < calendarSource.length; i++) {
            if (tempObj.id === calendarSource[i].id) {
                noRepeat = false;
            }
        }
        if (noRepeat) {
            calendarSource.push(tempObj);
        }
    }
    console.log('calendarSource: ' + calendarSource);
    console.log('cal src2: ' + JSON.stringify(calendarSource));



    $("#calendar1").fullCalendar('removeEvents');

    for (var i = 0; i < calendarSource.length; i++) {
        $('#calendar1').fullCalendar('renderEvent', calendarSource[i], [true])
    }




}

$('#calendar1').fullCalendar({
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: calendarSource

})



var today = moment().format("YYYY-MM-YY");
console.log(today);
var currentEventId;
var calendarView = true;
$(document).ready(function () {
    // $('#calendar1').fullCalendar({
    //     defaultDate: today,
    //     editable: true,
    //     allday: false,
    //     eventLimit: true, // allow "more" link when too many events
    //     events: tester123,
    //     // eventClick: function(events)
    //     // {
    //     //     console.log(events._id);
    //     // }
    //     eventClick: function (event, jsEvent, view) {
    //         currentEventId = event._id;
    //         console.log(event);
    //         $('#modalTitle').html(event.title);
    //         $('#Venue').html(event.description);
    //         $("#Time").html(event.time);
    //         $("#Price").html(event.price);
    //         $('#eventUrl').attr('href', event.url);
    //         $('#fullCalModal').modal();
    //         return false;
    //     },
    // })
    // $("#removeEvent").on("click", function () {
    //     $("#calendar1").fullCalendar('removeEvents', currentEventId)
    // })
    // $("#reformat").on("click", function () {
    //     console.log("why not");
    //     if ((calendarView == true)) {
    //         $('#calendar1').fullCalendar(
    //             'changeView', 'listMonth'
    //         );
    //         calendarView = false;
    //     } else {
    //         $('#calendar1').fullCalendar(
    //             'changeView', 'month'
    //         );
    //         calendarView = true;
    //     }
    // })
    // $("#button3").on("click", function () {
    //     $("#calendar1").fullCalendar('removeEvents');
    // })
});