let groupID;

function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
}
getGroupID()

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserData = db.collection("users").doc(user.uid); //global
        userID = user.uid;

        readGroupName();
        getVoteData();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../login.html";
    }
});

// display group name in the welcome message
function readGroupName() {
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


// display result as pie chart
function drawPie(suggestionList, suggestionResult) {
    var ctxP = document.getElementById("pieChart").getContext('2d');
    var myPieChart = new Chart(ctxP, {
        type: 'pie',
        data: {
            labels: suggestionList,
            datasets: [{
                data: suggestionResult,
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#62088A", "#1056eb", "#eb8c10", "#ace33d", "#395a99"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#BA47ED", "#44e4ee", "#e39b3d", "#bde075", "#6585c2"]
            }]
        },
        options: {
            responsive: true
        }
    });
}



var suggestionList = [];
var suggestionResult = [];
// get vote data and store the data in lists
function getVoteData() {

    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(queryGroup => {
            let Group = queryGroup.docs;
            let thisGroupSuggestion = Group[0].ref.collection("suggestions")
            thisGroupSuggestion
                .get()
                .then(allSuggestions => {
                    allSuggestions.forEach(doc => {
                        let suggestionName = doc.data().suggestion;
                        let suggestionNumber = doc.data().number;

                        suggestionList.push(suggestionName);
                        suggestionResult.push(suggestionNumber);
                    })
                    console.log(suggestionList);
                    console.log(suggestionResult);
                    drawPie(suggestionList, suggestionResult);
                })
        })
}