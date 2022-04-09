let currentUserData;
let userID;

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserData = db.collection("users").doc(user.uid);
        userID = user.uid;
        console.log(userID)

        displayUserName();
        populateGroupButtons();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "../login.html";
    }
});

// display username
function displayUserName() {
    currentUserData.get()
        .then(userDoc => {
            //get the data fields of the user
            var userName = userDoc.data().name;
            var userRole = userDoc.data().user_role;
            // populate user role and username
            $('#title_message').html(`${userRole} ${userName}🥳`)
        })
}

// populate the group buttons
function populateGroupButtons() {
    currentUserData.get()
        .then(userDoc => {
            var userGroups = userDoc.data().groups;
            // get to the correct group using group ID
            userGroups.forEach(groupID => {
                db.collection("Group").where("id", "==", groupID)
                    .get()
                    .then(queryGroup => {
                        let thisGroup = queryGroup.docs[0].data();
                        let thisGroupName = thisGroup.name;
                        // append the group buttons
                        $('#Group_buttons').append(`<button type="button" class="btn btn-primary btn-lg btn-block my-3 w-50" value = "${groupID}" onclick="join_group(this)"> ${thisGroupName} </button>
                        <br>`);
                    })
            })
        })
}

// pass the group ID to URL
function join_group(src) {
    let selectedGroupID = src.value;

    window.location.href = "../pages/group.html?group_id=" + selectedGroupID;
}