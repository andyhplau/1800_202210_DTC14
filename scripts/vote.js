//need to modify code of getting group_ID
let group_id = 'grp001';
let i = 1;

console.log(group_id)

function readGroupName() {
    
}

db.collection("Group").where("id", "==", group_id)
    .get()
    .then(queryGroup => {
        //see how many results you have got from the query
        size = queryGroup.size;
        // get the documents of query
        Group = queryGroup.docs;

        // We want to have one document per hike, so if the the result of 
        //the query is more than one, we can check it right now and clean the DB if needed.
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

function populateCardsDynamically() {
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
populateCardsDynamically();

function updateVoteResult(src) {
    let selection = src.value;
    let newNumber = null;

    db.collection("Suggestions").where("suggestion", "==", selection)
        .get()
        .then(querySuggestion => {
            var suggestionGroup = querySuggestion.docs[0].data();
            var currentNumber = suggestionGroup.number;
            newNumber = currentNumber + 1;
        })
        .then(function (querySuggestion) {
            querySuggestion.update({
                number: newNumber
            })
        })


    // }).then(() => {
    //     alert("Thank you for your suggest")
    //     window.location.href = "voting_result.html";
}



// function update_vote_result(src) {
//     let selection = src.value;
//     let new_number = null;

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             var currentUser = db.collection("users").doc(user.uid);
//             var userID = user.uid;


//             //get the document for current user.
//             currentUser.get()
//                 .then(userDoc => {
//                     var userEmail = userDoc.data().email;
//                     db.collection("Suggestions").where("suggestion", "==", selection)
//                         .get()
//                         .then(result => {
//                             selected_suggestion = result.docs[0].data();
//                             current_number = selected_suggestion.number;
//                             new_number = current_number + 1;
//                             console.log(new_number)
//                             console.log(result)
//                                 // }).then(set_new_result => {
//                                 //     set_new_result.ref.update({
//                                 //         number: new_number
//                                 //     })
//                                 .then(function (result) {
//                                     result.doc().update({
//                                         number: new_number
//                                     })
//                                 })
//                         })

//                     // }).then(() => {
//                     //     alert("Thank you for your suggest")
//                     //     window.location.href = "voting_result.html";
//                 })


//         } else {
//             // No user is signed in.
//             console.log("no user signed in")
//         }
//     });
// }