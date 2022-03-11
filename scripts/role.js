function get_role() {

    if(document.getElementById("tourist_btn").onclick){
        let role = document.getElementById("tourist_btn").value
        console.log(role)
    }

    if(document.getElementById("local_btn").onclick){
        let role = document.getElementById("local_btn").value
        console.log(role)
    }
    firebase.auth().onAuthStateChanged(user => {
        currentUser = db.collection("users").doc(user.uid)

        currentUser.update({
                user_role: role,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                console.log("Role Submittted")
                window.location.assign("interest.html") // Change to interests page once its done
            })
    })
}
