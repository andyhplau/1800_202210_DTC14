//need to modify code of getting group_ID
let group_id = 'grp001';
let i = 1;
let currentUser;
let userID;

console.log(group_id)

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUser = db.collection("users").doc(user.uid); //global
        console.log(currentUser);
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
    db.collection("Group").where("id", "==", group_id)
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
    // let suggestionListTemplate = document.getElementById("suggestionListTemplate");
    // let suggestionCardGroup = document.getElementById("suggestionCardGroup");

    db.collection("Suggestions").get()
        .then(allSuggestions => {
            allSuggestions.forEach(doc => {
                var suggestionName = doc.data().suggestion; //gets the suggestion field

                // let testSuggestionCard = suggestionListTemplate.content.cloneNode(true);
                // testSuggestionCard.querySelector('.list-group-item').innerHTML = suggestionName;

                // testSuggestionCard.querySelector('#listGroupCheckableRadios1').setAttribute = ('id', `listGroupCheckableRadios${i+1}`);

                // // testSuggestionCard.querySelector('#listGroupCheckableRadios1').setAttribute = ('for', `listGroupCheckableRadios${i+1}`);
                // // console.log(i)
                // i++;

                // suggestionCardGroup.appendChild(testSuggestionCard);

                $('#suggestionCardGroup').append(`<input class="list-group-item-check" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios${i}"
                value="${suggestionName}" onchange="updateVoteResult(this);"> <label class="list-group-item py-3" for="listGroupCheckableRadios${i}"> ${suggestionName} </label>`);
                i++;

            })

        })
}

function updateVoteResult(src) {
    let selection = src.value;
    let newNumber = null;
    let suggestionGroup

    db.collection("Suggestions").where("suggestion", "==", selection)
        .get()
        .then(querySuggestion => {
            console.log('inside function')
            suggestionGroup = querySuggestion.docs[0];
            var currentNumber = suggestionGroup.data().number;
            console.log('current number:', currentNumber)
            newNumber = currentNumber + 1;
            console.log('new number:', newNumber)

            suggestionGroup.ref.update({
                number: newNumber
            }).then(() => {
                console.log(suggestionGroup.data().number)
                // alert("Submission Successful");
                // window.location.href = "voting_result.html";
            })
        })
    console.log(suggestionGroup.data().number)
    // alert("Submission Successful");
    // window.location.href = "voting_result.html";
}