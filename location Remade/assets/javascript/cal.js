var today = moment().format("YYYY-MM-YY");
        console.log(today);
        var currentEventId;
        var calendarView = true;
        $(document).ready(function () {
            $('#calendar1').fullCalendar({
                defaultDate: today,
                editable: true,
                allday: false,
                eventLimit: true, // allow "more" link when too many events
                events: [{ title: 'U2 360 tour', start: '2018-08-18', time: 'Time : 7:00 PM', description: 'Venue : Shoreline', price: 'Price : $20' },
                { title: 'Pink Floyd', start: '2018-08-26', time: 'Time : 8:00 PM', description: 'Venue : Oracle arena', price: 'Price : $30' },
                { title: 'AC/DC', start: '2018-08-02', time: 'Time : 9:00 PM', description: 'Venue : At&t park', price: 'Price : $40' },
                { title: 'Adele', start: '2018-08-10', time: 'Time : 8:00 PM', description: 'Venue : Fox Theatre', price: 'Price : $50' }],
                // eventClick: function(events)
                // {
                //     console.log(events._id);
                // }
                eventClick: function (event, jsEvent, view) {
                    currentEventId = event._id;
                    console.log(event);
                    $('#modalTitle').html(event.title);
                    $('#Venue').html(event.description);
                    $("#Time").html(event.time);
                    $("#Price").html(event.price);
                    $('#eventUrl').attr('href', event.url);
                    $('#fullCalModal').modal();
                    return false;
                },
            })
            $("#removeEvent").on("click", function () {
                $("#calendar1").fullCalendar('removeEvents', currentEventId)
            })
            $("#reformat").on("click", function () {
                console.log("why not");
                if ((calendarView == true )) {
                $('#calendar1').fullCalendar(
                    'changeView', 'listMonth'                   
                );
                calendarView = false;
                }
                else {
                    $('#calendar1').fullCalendar(
                    'changeView', 'month'                   
                );
                calendarView = true; 
                }
            })
                $("#button3").on("click", function () {
                    $("#calendar1").fullCalendar('removeEvents');
                })
            });