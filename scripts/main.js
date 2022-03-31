let currentUserData;
let userID;

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        currentUserData = db.collection("users").doc(user.uid); //global
        userID = user.uid;
        console.log(userID)

        displayUserName();
        populateGroupButtons();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        window.location.href = "login.html";
    }
});

function displayUserName() {
    currentUserData.get()
        .then(userDoc => {
            //get the data fields of the user
            var userName = userDoc.data().name;
            var userRole = userDoc.data().user_role;

            $('#title_message').html(`Welcome back ${userRole} ${userName}🥳`)
        })
}

function populateGroupButtons() {
    currentUserData.get()
        .then(userDoc => {
            var userGroups = userDoc.data().groups;

            userGroups.forEach(groupID => {
                db.collection("Group").where("id", "==", groupID)
                    .get()
                    .then(queryGroup => {
                        let thisGroup = queryGroup.docs[0].data();
                        let thisGroupName = thisGroup.name;

                        $('#Group_buttons').append(`<button type="button" class="btn btn-primary btn-lg btn-block my-3 w-50" value = "${groupID}" onclick="join_group(this)"> ${thisGroupName} </button>
                        <br>`);
                    })
            })
        })
}

function join_group(src) {
    let selectedGroupID = src.value;

    window.location.href = "group.html?group_id=" + selectedGroupID;
}