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
                window.location.assign("vote_page.html") // Change to group selection page once its done
            })
    })
}