var config = {
    apiKey: "AIzaSyAD_QqvFCnxny4_PdU9Oe5BSy0EfzgTpkc",
    authDomain: "farley-d28f6.firebaseapp.com",
    databaseURL: "https://farley-d28f6.firebaseio.com",
    projectId: "farley-d28f6",
    storageBucket: "farley-d28f6.appspot.com",
    messagingSenderId: "558496574088"
};

firebase.initializeApp(config);

var database = firebase.database();
var auth = firebase.auth();
var testObj = {
    event1: {
        name: "event1",
        location: "location1"
    },
    event2: {
        name: "event2",
        location: "location2"
    }
}
var userId;

$(document).ready(function () {

    $("#logIn").on("click", function (e) {

        e.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
            var email = $("#emailText").val().trim();
            var password = $("#passwordText").val().trim();
            auth.signInWithEmailAndPassword(email, password).catch(function (error) {
                console.log(error.code);
            })
        })
    });

    $("#signUp").on("click", function (e) {
        e.preventDefault();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {
            var email = $("#emailText").val().trim();
            var password = $("#passwordText").val().trim();
            auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                console.log(error.code);
            })
        })
    });

    $("#logOut").on("click", function (e) {
        auth.signOut();
        $("#logOut").addClass('hide');
        $(".hideMe").removeClass('hide');
        $('#currentUser').addClass('hide');

    })
    1
    auth.onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log(firebaseUser);
            userId = firebaseUser.uid;
            $('.hideMe').addClass('hide');
            $('#currentUser').removeClass('hide');
            $('#currentUser').text("Welcome, " + firebaseUser.email + "!");
            $("#logIn").addClass('hide')
            $("#signUp").addClass('hide');
            $("#logOut").removeClass('hide');

            database.ref("/users/" + userId).once('value', function (snapshot) {
                if (snapshot.val()) {
                    userEvents = snapshot.val();
                    addToCalendar();

                } else {
                    userEvents = {};
                }
            })
        } else {
            console.log("not logged in");
        }
    })

    database.ref("/user/" + userId).on('value', function (snapshot) {
        addToCalendar();
    })

    $("#testButton").on('click', function (e) {
        e.preventDefault();
        database.ref('/users/' + userId).on('value', function (snapshot) {
            console.log(snapshot.val().events);
        })
    })

})