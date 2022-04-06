let groupID;

// direct to suggestion.html and pass groupID with URL
function go_suggest_page() {
    window.location.href = "suggestion.html?group_id=" + groupID;
}

// direct to vote_page.html and pass groupID with URL
function go_vote_page() {
    window.location.href = "vote_page.html?group_id=" + groupID;
}

// direct to chat.html and pass groupID with URL
function go_chat_page() {
    window.location.href = "chat.html?group_id=" + groupID;
}

// direct to voting_result.html and pass groupID with URL
function go_vote_result_page() {
    window.location.href = "voting_result.html?group_id=" + groupID;
}

// get group id from URL
function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
    console.log(groupID)
}

function populateMembers() {
    // go to the correct group using groupID
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
                            var userProfilePictureURL = "./images/profile-icon.png"
                        }
                        // place the local users
                        if (userRole == "Local") {
                            $("#localUsers").append(`<li class="m-3" style="clear: both;"><img class="rounded-circle border border-dark border-1 d-block mx-3" style="width: 1.7rem; float: left;" src=${userProfilePictureURL}>${userName}</li>`);
                            // place the tourist users
                        } else if (userRole == "Tourist") {
                            $("#touristUsers").append(`<li class="m-3" style="clear: both;"><img class="rounded-circle border border-dark border-1 d-block mx-3" style="width: 1.7rem; float: left;" src=${userProfilePictureURL}>${userName}</li>`);
                        }
                    })
            })
        })
}

// call the functions inside
function setup() {
    getGroupID();
    populateMembers();
}

// call the setup function when page is ready
$(document).ready(setup);
