// only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserData = db.collection("users").doc(user.uid); //global

    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../login.html";
    }
});

// collect users' 3 interests
function submit_interest() {

    // log data to console
    console.log("Submit Interest")
    let first_interest = document.getElementById("interest_1").value
    let second_interest = document.getElementById("interest_2").value
    let third_interest = document.getElementById("interest_3").value
    console.log(first_interest, second_interest, third_interest)

    // write data to Firestore
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid)

        currentUser.update({
                interest_1: first_interest,
                interest_2: second_interest,
                interest_3: third_interest,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log("Interest submitted!")
                window.location.assign("../pages/matched.html")
            })
    })
}