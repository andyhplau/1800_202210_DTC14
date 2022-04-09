var currentUser

// direct to main.html
function home_button() {
    window.location.href = "../pages/main.html";
}

// let the user to logout and direct to index.html
function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // direct user to index.html if successfully signed out
        window.location.href = "index.html";
    }).catch((error) => {
        // An error happened.
    });
}

// populate user profile picture to bottom navbar
function show_profile() {
    firebase.auth().onAuthStateChanged(user => {

        // check if user is signed in
        if (user) {
            // hide login button and show logout button if user is signed in
            $('#loginButton').hide()
            $('#logoutButton').show()
            // go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            // get the document for current user
            currentUser.get()
                .then(userDoc => {
                    var userProfilePictureURL = userDoc.data().profile_picture_URL;
                    console.log(userProfilePictureURL)
                    // replace to the user profile picture if the URL is not empty
                    if (userProfilePictureURL != null) {
                        $("#navProfilePicture").attr("src", userProfilePictureURL);
                    }
                })
        } else {
            // show login button and hide logout button if user is not signed in
            $('#loginButton').show()
            $('#logoutButton').hide()
            // No user is signed in.
            console.log("No user is signed in");
        }
    })
}

// direct to profile.html
function profile_button() {
    window.location.href = "../pages/profile.html";
}

// call the functions inside
function setup() {
    show_profile();
}

// call the setup function when page is ready
$(document).ready(setup);