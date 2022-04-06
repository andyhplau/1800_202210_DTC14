var currentUser

// redirect home button to main.html
function home_button() {
    window.location.href="../main.html";
}

// redirect profile button to profile.html
function profile_button(){
    window.location.href="../profile.html";
}

// populate user profile picture to bottom navbar
function show_profile(){
    firebase.auth().onAuthStateChanged(user=>{

        // check if user is signed in
        if (user) {
            // go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            // get the document for current user
            currentUser.get()
            .then(userDoc =>{
                var userProfilePictureURL = userDoc.data().profile_picture_URL;
                console.log(userProfilePictureURL)
                // replace user profile picture if the URL is not empty
                if (userProfilePictureURL!= null){
                    $("#navProfilePicture").attr("src", userProfilePictureURL);
                }
            })
        }else{
            // No user is signed in.
            console.log("No user is signed in")
        }
    })
}

function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "login.html";
      }).catch((error) => {
        // An error happened.
      });
}

show_profile();