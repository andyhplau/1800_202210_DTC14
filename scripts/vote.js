let groupID;
let i = 1;
let currentUserData;
let userID;

// get group ID from URL
function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
}

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // get the user document
        currentUserData = db.collection("users").doc(user.uid);
        userID = user.uid;

        readGroupName();
        populateVotingList();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // direct to login.html
        window.location.href = "../login.html";
    }
});

// display group name in the welcome message
function readGroupName() {
    // get the correct group using the groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(queryGroup => {
            //see how many results you have got from the query
            let size = queryGroup.size;
            // get the documents of query
            let Group = queryGroup.docs;

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

// populate all suggestions as buttons
function populateVotingList() {
    // get the correct group using the groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(queryGroup => {
            let Group = queryGroup.docs;
            let thisGroupSuggestion = Group[0].ref.collection("suggestions")
            thisGroupSuggestion
                .get()
                .then(allSuggestions => {
                    allSuggestions.forEach(doc => {
                        //gets the suggestion field
                        var suggestionName = doc.data().suggestion;

                        $('#suggestionCardGroup').append(`<input class="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios${i}"
                value="${suggestionName}" onchange="updateVoteResult(this);"> <label class="list-group-item py-3" for="listGroupCheckableRadios${i}"> ${suggestionName} </label>`);
                        i++;

                    })

                })
        })
}

// add 1 to number value inside the matched suggestion document
function updateVoteResult(src) {
    let selection = src.value;
    let newNumber = null;

    // get the correct group using the groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(queryGroup => {
            let Group = queryGroup.docs;

            Group[0].ref.update({
                votedMembers: firebase.firestore.FieldValue.arrayUnion(userID)
            })

            let thisGroupSuggestion = Group[0].ref.collection("suggestions")
            // get to the correct suggestion document by query
            thisGroupSuggestion.where("suggestion", "==", selection)
                .get()
                .then(querySuggestion => {
                    suggestionGroup = querySuggestion.docs[0];
                    var currentNumber = suggestionGroup.data().number;
                    console.log('current number:', currentNumber)
                    newNumber = currentNumber + 1;
                    console.log('new number:', newNumber)

                    // update the suggestion document
                    suggestionGroup.ref.update({
                        number: newNumber
                    }).then(() => {
                        setTimeout(() => {
                            console.log("inside timeout");
                        }, 2000);
                        alert("Submission Successful");
                        window.location.assign("../pages/group.html?group_id=" + groupID)
                    })
                })
        })
}

// call the functions inside
function setup() {
    getGroupID();
}

// call the setup function when page is ready
$(document).ready(setup);