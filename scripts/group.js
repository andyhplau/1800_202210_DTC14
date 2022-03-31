let groupID;



function go_suggest_page() {
    window.location.href = "suggestion.html?group_id=" + groupID;
}

function go_vote_page() {
    window.location.href = "vote_page.html?group_id="+ groupID;
}

function go_chat_page() {
    window.location.href = "chat.html?group_id="+ groupID;
}


function getGroupID() {
    // create a URL object
    let params = new URL(window.location.href);
    groupID = params.searchParams.get("group_id");

}
getGroupID()