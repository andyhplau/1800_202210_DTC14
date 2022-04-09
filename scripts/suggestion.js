let groupID;
let currentUserData;
let userID;
let Group;

// get group ID from URL
function getGroupID() {
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
}

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // get to the user document
        currentUserData = db.collection("users").doc(user.uid)
        userID = user.uid;
        //get the document for current user.

        readGroupName();
    } else {
        // No user is signed in.
        console.log("no user signed in")
        window.location.href = "../login.html";
    }
});

// Display group name in welcome message
function readGroupName() {
    // get the correct group using the groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(queryGroup => {
            //see how many results you have got from the query
            size = queryGroup.size;
            // get the documents of query
            Group = queryGroup.docs;

            //the query is more than one, we can check it right now and clean the DB if needed.
            if (size == 1) {
                let thisGroup = Group[0].data();
                $(".group_name").html(thisGroup.name);

            } else {
                console.log("Query has more than one data");
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

// store user input in the suggestion document
function store_suggestion() {
    let thisSuggestion = $('#suggested_location').val();
    
    // Add the data to suggestion collection
    let thisGroupSuggestion = Group[0].ref.collection("suggestions")
    
    thisGroupSuggestion.add({
        groupID: groupID,
        userID: userID,
        suggestion: thisSuggestion,
        number: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Thank you for your suggest")
        window.location.href = "../pages/group.html?group_id=" + groupID;
    })
}

// call the functions inside
function setup() {
    getGroupID();
}

// call the setup function when page is ready
$(document).ready(setup);