let groupID;
let i = 1;
let currentUserData;
let userID;

function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");

}
getGroupID()
console.log(groupID)

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserData = db.collection("users").doc(user.uid); //global
        console.log(currentUserData);
        userID = user.uid;

        readGroupName();
        populateVotingList();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function readGroupName() {
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(queryGroup => {
            //see how many results you have got from the query
            size = queryGroup.size;
            // get the documents of query
            Group = queryGroup.docs;

            // We want to have one document per group
            if (size == 1) {
                var thisGroup = Group[0].data();
                $(".group_name").html(thisGroup.name);

            } else {
                console.log("Query has more than one data")
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}

function populateVotingList() {

    db.collection("Suggestions").where("code", "==", groupID)
        .get()
        .then(allSuggestions => {
            allSuggestions.forEach(doc => {
                var suggestionName = doc.data().suggestion; //gets the suggestion field

                $('#suggestionCardGroup').append(`<input class="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios${i}"
                value="${suggestionName}" onchange="updateVoteResult(this);"> <label class="list-group-item py-3" for="listGroupCheckableRadios${i}"> ${suggestionName} </label>`);
                i++;

            })

        })
}

function updateVoteResult(src) {
    let selection = src.value;
    let newNumber = null;

    db.collection("Suggestions").where("suggestion", "==", selection).where("code", "==", groupID)
        .get()
        .then(querySuggestion => {
            suggestionGroup = querySuggestion.docs[0];
            var currentNumber = suggestionGroup.data().number;
            console.log('current number:', currentNumber)
            newNumber = currentNumber + 1;
            console.log('new number:', newNumber)

            suggestionGroup.ref.update({
                number: newNumber
            }).then(() => {
                setTimeout(() => {
                    console.log("inside timeout");
                }, 2000);
                alert("Submission Successful");
                window.location.assign("voting_result.html?group_id=" + groupID)
            })
        })
}