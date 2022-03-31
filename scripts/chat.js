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
                    var thisUser = userDoc.data().name;
                    var thisUserID = user.uid;
                    var thisMessage = $("#chat_message").val();
                    // storing message to firestore
                    // console.log(thisUser, thisUserID, thisMessage)
                    db.collection("Group").where("id", "==", groupID)
                        .get()
                        .then(group => {
                            group.docs[0].ref.collection("chats").add({
                                message: thisMessage,
                                userName: thisUser,
                                userID: thisUserID,
                                timestamp: firebase.firestore.FieldValue.serverTimestamp()
                            })
                        }).then(() => {
                            $("#chat_message").val("");
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
    $("#chatMessageBox").empty()
    db.collection("Group").where("id", "==", groupID)
        .get()
        .then(group => {
            group.docs[0].ref.collection("chats")
                // .docs[0].collection("chats")
                // doc(groupID).collection("chats")
                .orderBy("timestamp")
                .get()
                .then(allChats => {
                    allChats.forEach(chat => {
                        var userName = chat.data().userName;
                        // var userID = chat.data().userID;
                        var message = chat.data().message;
                        var time = chat.data().timestamp.toDate();
                        // console.log(time.toLocaleString());
                        $("#chatMessageBox").append(`<div class="toast show my-3">
                    <div class="toast-header">
                        <strong class="me-auto">${userName}</strong>
                        <small>${time.toLocaleString()}</small>
                    </div>
                    <div class="toast-body">
                        <p>${message}</p>
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