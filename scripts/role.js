// update user's role
function get_role(role) {
    firebase.auth().onAuthStateChanged(user => {
        // get to the user document
        currentUser = db.collection("users").doc(user.uid)
        // update user's role and put a timestamp
        currentUser.update({
                user_role: role,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log("Role Submittted")
                // direct to interest.html
                window.location.assign("../pages/interest.html")
            })
    })
}

// get the role value from the page when button is clicked
$('.role_btn').click(function takeRole() {
    let role = $(this).val();
    console.log(role)
    get_role(role)
})