let groupID;

function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");
    console.log(groupID)
}

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
                    var thisMessage = $("#chat_message").val();
                    // get to the correct group using the groupID
                    db.collection("Group").where("id", "==", groupID)
                        .get()
                        .then(group => {
                            // add the message data to chats collection inside group document
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

function populateChats() {
    // empty the messages
    $("#chatMessageBox").empty()
    // get to the right group document with the groupID
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(group => {
            // get to the chats collection, and sort all chat document by time
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

function getGroupName() {
    var currentGroup = db.collection("Group").where("id", "==", groupID)
    currentGroup.get()
        .then(group => {
            var groupName = group.docs[0].data().name;
            $("#groupName").html(groupName);
        })
}

function setup() {
    getGroupID();
    getGroupName();
    populateChats();
    $("#send_chat").click(storeChat);
}

$(document).ready(setup);