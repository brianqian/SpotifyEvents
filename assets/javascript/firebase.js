var config = {
    apiKey: "AIzaSyB0DMqLPuYHYZtXJrliz4ekLJoLtxkkGeQ",
    authDomain: "events-3b88d.firebaseapp.com",
    databaseURL: "https://events-3b88d.firebaseio.com",
    projectId: "events-3b88d",
    storageBucket: "events-3b88d.appspot.com",
    messagingSenderId: "390178045451"
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
            $('#currentUser').text("Welcome, " + userId + "!");
            $("#logIn").addClass('hide')
            $("#signUp").addClass('hide');
            $("#logOut").removeClass('hide');

        } else {
            console.log("not logged in");
        }
    })

    $("#testButton").on('click', function (e) {
        e.preventDefault();
        database.ref('/users/' + userId).on('value', function (snapshot) {
            console.log(snapshot.val().events);
        })
    })

})