//need to modify code of getting group_ID
let group_id = 'grp001';

console.log(group_id)

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
        let suggestionListTemplate = document.getElementById("suggestionListTemplate");
        let suggestionCardGroup = document.getElementById("suggestionCardGroup");
        
        db.collection("Suggestions").get()
            .then(allSuggestions => {
                allSuggestions.forEach(doc => {
                    var suggestionName = doc.data().suggestion; //gets the suggestion field
                    let testSuggestionCard = suggestionListTemplate.content.cloneNode(true);
                    testSuggestionCard.querySelector('.list-group-item').innerHTML = suggestionName;

                    // testSuggestionCard.querySelector('.list-group-item-check').setAttribute = ('id', `listGroupCheckableRadios${suggestionName}`);
                    
                    // testSuggestionCard.querySelector('.list-group-item').setAttribute = ('for', `listGroupCheckableRadios${suggestionName}`);

                    suggestionCardGroup.appendChild(testSuggestionCard);
                })
    
            })
    }
    populateCardsDynamically();
    