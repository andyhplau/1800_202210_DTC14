
var group_id = db.collection('Group').doc('Group1');

console.log(group_id)

// db.collection("Group").where("id", "==", group_id)
//     .get()
//     .then(queryGroup => {
//         //see how many results you have got from the query
//         size = queryGroup.size;
//         // get the documents of query
//         Group = queryGroup.docs;

//         // We want to have one document per hike, so if the the result of 
//         //the query is more than one, we can check it right now and clean the DB if needed.
//         if (size == 1) {
//             var thisGroup = Group[0].data();

//             document.getElementById("group_name").innerHTML = thisGroup.name;
//         } else {
//             console.log("Query has more than one data")
//         }
//     })
//     .catch((error) => {
//         console.log("Error getting documents: ", error);
//     });

function store_suggestion() {
    suggestion = $('#suggested_location').val()
    console.log(suggestion)

    // firebase.auth().onAuthStateChanged(user => {
    //     if (user) {
    //         var currentUser = db.collection("users").doc(user.uid)
    //         var userID = user.uid;
    //         //get the document for current user.
    //         currentUser.get()
    //             .then(userDoc => {
    //                 var userEmail = userDoc.data().email;
    //                 db.collection("Suggestions").add({
    //                     code: group_id,
    //                     userID: userID,
    //                     suggestion: suggestion,
    //                     timestamp: firebase.firestore.FieldValue.serverTimestamp()
    //                 }).then(() => {
    //                     window.location.href = "thanks.html"; //new line added
    //                 })
    //             })  

    //     } else {
    //         // No user is signed in.
    //         console.log("no user signed in")
    //     }
    // });

    firebase.auth().onAuthStateChanged(add_suggestion => {
        db.collection("Suggestions").add({
            code: group_id,
            suggestion: suggestion,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; //new line added
        })
    })

alert("Thank you for your suggest")
// need to change page!! (Group room)
location.href = 'vote_page.html';

}