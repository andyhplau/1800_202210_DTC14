let groupID;
let userID;

//only works when user is logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // get the user document
        currentUserData = db.collection("users").doc(user.uid);
        userID = user.uid;

        getGroupID();
        populateMembers();
    } else {
        // No user is signed in.
        console.log("No user is signed in");
        // direct user to login.html
        window.location.href = "../login.html";
    }
});

// direct to suggestion.html and pass groupID with URL
function go_suggest_page() {
    window.location.href = "../pages/suggestion.html?group_id=" + groupID;
}

// direct to vote_page.html and pass groupID with URL
function go_vote_page() {
    let voting = false;
    console.log(groupID)
    console.log(userID)
    // get the correct group using the groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(groupDoc => {
            groupDoc.forEach(doc => {
                if (doc.data().votedMembers.includes(userID)) {
                    voting = true
                }
            })
        }).then(() => {
            console.log(voting)
            if (voting == true) {
                alert("You've already voted.");
            } else {
                window.location.href = "../pages/vote_page.html?group_id=" + groupID;
            }
        })
}

// direct to chat.html and pass groupID with URL
function go_chat_page() {
    window.location.href = "../pages/chat.html?group_id=" + groupID;
}

// direct to voting_result.html and pass groupID with URL
function go_vote_result_page() {
    window.location.href = "../pages/voting_result.html?group_id=" + groupID;
}

// get group id from URL
function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
    console.log(groupID)
}

// populate group members to group.html
function populateMembers() {
    // go to the correct group using groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(groupDoc => {
            // get the group name
            var groupName = groupDoc.docs[0].data().name;
            // pass group name to groupName span
            $("#groupName").html(groupName);
            // get the members in the group
            var group = groupDoc.docs[0].data().members;
            group.forEach(uid => {
                // get the user docs
                var users = db.collection("users").doc(uid)
                    .get()
                    .then(userDoc => {
                        var userName = userDoc.data().name;
                        var userProfilePictureURL = userDoc.data().profile_picture_URL;
                        var userRole = userDoc.data().user_role;
                        console.log(uid, userName, userProfilePictureURL, userRole)
                        // set default profile picture if URL is null
                        if (userProfilePictureURL == null) {
                            var userProfilePictureURL = "../images/profile-icon.png"
                        }
                        // place the local users
                        if (userRole == "Local") {
                            $("#localUsers").append(`<div class="m-3 px-5" style="clear: both;"><img class="rounded-circle border border-dark border-1 d-block mx-3" style="width: 1.7rem; float: left;" src=${userProfilePictureURL}>${userName}</div>`);
                            // place the tourist users
                        } else if (userRole == "Tourist") {
                            $("#touristUsers").append(`<div class="m-3 px-5" style="clear: both;"><img class="rounded-circle border border-dark border-1 d-block mx-3" style="width: 1.7rem; float: left;" src=${userProfilePictureURL}>${userName}</div>`);
                        }
                    })
            })
        })
}