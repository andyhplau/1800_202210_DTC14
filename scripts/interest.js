// only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // get the user document
        currentUserData = db.collection("users").doc(user.uid);

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../login.html";
    }
});

// collect user's 3 interests
function submit_interest() {

    // log data to console
    console.log("Submit Interest")
    // get user's 3 interests values
    let first_interest = document.getElementById("interest_1").value
    let second_interest = document.getElementById("interest_2").value
    let third_interest = document.getElementById("interest_3").value

    // write data to Firestore
    firebase.auth().onAuthStateChanged(user => {
        // get to the user document
        currentUser = db.collection("users").doc(user.uid)
        // update user's interest to user document
        currentUser.update({
                interest_1: first_interest,
                interest_2: second_interest,
                interest_3: third_interest,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log("Interest submitted!")
                // direct to matched.html
                window.location.assign("../pages/matched.html")
            })
    })
}