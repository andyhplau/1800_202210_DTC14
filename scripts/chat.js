function storeChat() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            // get the document for current user
            currentUser.get()
                .then(userDoc => {
                    var thisUser = userDoc.data().name;
                    var thisUserID = user.uid
                    var thisMessage = $("#chat_message").val()
                    // storing message to firestore
                    // console.log(userName, userID, thisMessage)
                    db.collection("Group").doc("Group1").collection("chats").add({
                        message: thisMessage,
                        userName: thisUser,
                        userID: thisUserID,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                }).then(()=>{
                    window.location.reload()
                })
        }
    })
}