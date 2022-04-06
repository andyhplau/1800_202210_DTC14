var currentUser

// direct to main.html
function home_button() {
    window.location.href="../main.html";
}

// let the user to logout and redirect to index.html
function logout() {
    console.log("logging out user");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = "login.html";
      }).catch((error) => {
        // An error happened.
      });
}

// direct to previous page
function go_back(){
    history.back()
}

show_profile();