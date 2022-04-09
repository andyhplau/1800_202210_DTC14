// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

// function for sign in/ sign up
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            var user = authResult.user
            if (authResult.additionalUserInfo.isNewUser) {
                // create "user" collection
                db.collection("users")
                    // define a document for using UID as document ID
                    .doc(user.uid).set({
                        name: user.displayName,
                        email: user.email
                    }).then(function () {
                        console.log("New user added to firestore")
                        // direct new user to roles.html if successfully signed up
                        window.location.assign("../pages/roles.html")
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            } else {
                return true
            }
            return false
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    // direct user to main.html if successfully signed in
    signInSuccessUrl: '../pages/main.html',
    signInOptions: [
        // let users sign up/ sign in using email
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);