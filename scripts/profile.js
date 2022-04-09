var currentUser

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        userID = user.uid;

        populateInfo();
        upload_profile_picture();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../login.html";
    }
});

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userGender = userDoc.data().gender;
                    var userEmail = userDoc.data().email;
                    var userRole = userDoc.data().user_role;
                    var userCountry = userDoc.data().country;
                    var userLanguageCode = userDoc.data().language_code;
                    var userProfilePictureURL = userDoc.data().profile_picture_URL

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userGender != null) {
                        document.getElementById("genderInput").value = userGender;
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                    if (userRole != null) {
                        document.getElementById("roleInput").value = userRole;
                    }
                    if (userCountry != null) {
                        document.getElementById("residenceInput").value = userCountry;
                    }
                    if (userLanguageCode != null) {
                        document.getElementById("languageInput").value = userLanguageCode;
                    }
                    if (userProfilePictureURL != null) {
                        $("#profilePicture").attr("src", userProfilePictureURL)
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

//call the function to run it 

function editUserInfo() {
    document.getElementById("personalInfoFields").disabled = false
    document.getElementById("emailInput").disabled = true
}

function saveUserInfo() {
    userName = document.getElementById("nameInput").value;
    userGender = document.getElementById("genderInput").value;
    userRole = document.getElementById("roleInput").value;
    userCountry = document.getElementById("residenceInput").value;
    userLanguageCode = document.getElementById("languageInput").value;
    userLanguage = $("#languageInput option:selected").text();

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)

            // write or update database
            currentUser.update({
                    name: userName,
                    gender: userGender,
                    user_role: userRole,
                    country: userCountry,
                    language_code: userLanguageCode,
                    language: userLanguage
                })
                .then(() => {
                    console.log("Document successfully updated!")
                    document.getElementById('personalInfoFields').disabled = true
                })
        }
    })
}


function upload_profile_picture() {
    firebase.auth().onAuthStateChanged(user => {
        // check if user is signed in
        if (user) {
            var uploadButton = document.getElementById("uploadButton");
            uploadButton.addEventListener("change", uploadFile => {
                var file = uploadFile.target.files[0];
                // upload the picture to firestore storage
                var uploadStorage = firebase.storage().ref("profile_pictures/" + user.uid + ".jpeg").put(file)
                uploadStorage.then(() => {
                    // Get the URL
                    uploadStorage.snapshot.ref.getDownloadURL().then((pictureURL) => {
                        console.log('profile picture URL: ', pictureURL);
                        alert("Picture uploaded!")
                        db.collection("users").doc(user.uid).update({
                                profile_picture_URL: pictureURL
                            })
                            .then(() => {
                                $("#profilePicture").attr("src", pictureURL)
                            })
                    })
                })
            })
        } else {
            // No user is signed in.
            console.log("No user is signed in")
        }
    })
}