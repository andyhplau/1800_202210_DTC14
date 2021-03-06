let currentUserData;
let userID;

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // get the user document
        currentUserData = db.collection("users").doc(user.uid);
        userID = user.uid;
        console.log(userID)

        getInterestList();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../login.html";
    }
});

// get user's interest from firestore and store in a list
function getInterestList() {
    // get the user document
    currentUserData.get()
        .then(userDoc => {
            //read the data fields of the user
            interest1 = userDoc.data().interest_1;
            interest2 = userDoc.data().interest_2;
            interest3 = userDoc.data().interest_3;

            let interest_list = [interest1, interest2, interest3];

            populateInterestList(interest_list)
        })
}

// populate suggested group based on user's interests and group activities
function populateInterestList(interest_list) {
    let suggestionListTemplate = document.getElementById("cardTemplete");
    let suggestionCardGroup = document.getElementById("suggestionCardGroup");
    // loop through each interest
    interest_list.forEach(function (interest) {
        // get the correct group using the interest and category by query
        db.collection("Group").where("category", "==", interest)
            .get()
            .then(queryGroup => {
                suggestionGroup = queryGroup.docs[0];
                var groupTitle = suggestionGroup.data().name;
                var groupID = suggestionGroup.data().id;
                var groupMember = suggestionGroup.data().members;
                var numberOfMember = 0;

                if (typeof (groupMember) == 'object')
                    numberOfMember = Object.keys(groupMember).length

                let testSuggestionCard = suggestionListTemplate.content.cloneNode(true);
                // write the data to the page
                testSuggestionCard.querySelector('.card_group_title').innerHTML = groupTitle;

                testSuggestionCard.querySelector('.card_text').innerHTML = "Current number of member: " + numberOfMember;

                testSuggestionCard.querySelector('.join_btn').id = groupID;

                suggestionCardGroup.appendChild(testSuggestionCard);

            })
    })
}

// stroed userID in group document, groupID in user document after clicking join button
function joining(src) {
    let selection = src.id;

    // put selected group_id to user's document
    currentUserData.update({
        groups: firebase.firestore.FieldValue.arrayUnion(selection)
    })

    // put user_name to selected group document 
    // get to the correct group using the group ID and selection by query
    db.collection("Group").where("id", "==", selection)
        .get()
        .then(queryGroup => {
            selectedGroup = queryGroup.docs[0];

            selectedGroup.ref.update({
                members: firebase.firestore.FieldValue.arrayUnion(userID)
            }).then(() => {
                setTimeout(() => {
                    // console.log("inside timeout");
                }, 2000);
                alert("Successfully joined group!");
                window.location.assign("../pages/main.html")
            })

        })
}