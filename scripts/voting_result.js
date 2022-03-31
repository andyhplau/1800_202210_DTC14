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


//pie
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
// get vote data and store in list
function getVoteData() {
    // var suggestionList = [];
    // var suggestionResult = [];

    db.collection("Suggestions").get()
        .then(allSuggestions => {
            allSuggestions.forEach(doc => {
                let suggestionName = doc.data().suggestion;
                let suggestionNumber = doc.data().number;

                // console.log(suggestionName, suggestionNumber)

                suggestionList.push(suggestionName);
                suggestionResult.push(suggestionNumber);
            })
            console.log(suggestionList);
            console.log(suggestionResult);
            drawPie(suggestionList, suggestionResult);
        })
}

getVoteData();

function goBack() {
    window.location.href = "group.html";
}