function get_role(role) {
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid)

        currentUser.update({
                user_role: role,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log("Role Submittted")
                window.location.assign("../pages/interest.html")
            })
    })
}

$('.role_btn').click(function takeRole(){
    let role = $(this).val();
    console.log(role)
    get_role(role)
})