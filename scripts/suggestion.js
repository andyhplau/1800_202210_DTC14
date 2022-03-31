let groupID;

function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");

}
getGroupID()

db.collection("Group").where("id", "==", groupID)
    .get()
    .then(queryGroup => {
        //see how many results you have got from the query
        size = queryGroup.size;
        // get the documents of query
        Group = queryGroup.docs;

        //the query is more than one, we can check it right now and clean the DB if needed.
        if (size == 1) {
            var thisGroup = Group[0].data();
            $(".group_name").html(thisGroup.name);

        } else {
            console.log("Query has more than one data");
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

function store_suggestion() {
    suggestion = $('#suggested_location').val();

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var currentUser = db.collection("users").doc(user.uid)
            var userID = user.uid;
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var userEmail = userDoc.data().email;
                    db.collection("Suggestions").add({
                        code: groupID,
                        userID: userID,
                        suggestion: suggestion,
                        number: 0,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        alert("Thank you for your suggest")
                        window.location.href = "group.html?group_id=" + groupID;
                    })
                })

        } else {
            // No user is signed in.
            console.log("no user signed in")
        }
    });

}