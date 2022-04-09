let groupID;

// get the group ID from URL
function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
    console.log(groupID)
}

// store new messages to firestore
function storeChat() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            // get the document for current user
            currentUser.get()
                .then(userDoc => {
                    // get the user name
                    var thisUser = userDoc.data().name;
                    var thisUserID = user.uid;
                    // get the new message from message box
                    var thisMessage = $("#chat_message").val();
                    // get the correct group using the groupID by query
                    db.collection("Group").where("id", "==", groupID)
                        .get()
                        .then(group => {
                            // create a new document in chats collection and store the message
                            group.docs[0].ref.collection("chats").add({
                                message: thisMessage,
                                userName: thisUser,
                                userID: thisUserID,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                        }).then(() => {
                            // clear the message box
                            $("#chat_message").val("");
                            // populate the messages again
                            setTimeout(populateChats, 500);
                        })
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in.");
        }
    })
}

// populate messages from firestore
function populateChats() {
    // empty the message box
    $("#chatMessageBox").empty()
    // get to the right group document with the groupID by query
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(group => {
            // get the chats collection, and sort all chat document with timestamp
            group.docs[0].ref.collection("chats")
                .orderBy("timestamp")
                .get()
                .then(allChats => {
                    allChats.forEach(chat => {
                        var userName = chat.data().userName;
                        var message = chat.data().message;
                        var time = chat.data().timestamp.toDate();
                        // appending the messages to the page
                        $("#chatMessageBox").append(`<div class="card my-3">
                    <div class="card-header text-center">
                        <strong>${userName}</strong>
                    </div>
                    <div class="card-body">
                        <p>${message}</p>
                    </div>
                    <div class="card-footer text-muted text-center">
                        <small>${time.toLocaleString()}</small>
                    </div>
                </div>`);
                    })
                })
        })
}

// populate the group name using groupID
function getGroupName() {
    // get the right group document by query
    var currentGroup = db.collection("Group").where("id", "==", groupID)
    currentGroup.get()
        .then(group => {
            // get the group name
            var groupName = group.docs[0].data().name;
            // assign the group name to the page
            $("#groupName").html(groupName);
        })
}

// call the functions inside
function setup() {
    getGroupID();
    getGroupName();
    populateChats();
    $("#send_chat").click(storeChat);
}

// call the setup function when page is ready
$(document).ready(setup);