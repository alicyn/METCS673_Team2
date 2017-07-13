window.onload = function() {
    // Initialize Firebase
    var config = {        
        apiKey: "AIzaSyBPj1-RVUplL_9hJniAIEXpw92vI7L2k44",
        authDomain: "metcs673-acac6.firebaseapp.com",
        databaseURL: "https://metcs673-acac6.firebaseio.com/",
        storageBucket: "metcs673-acac6.appspot.com"
    };
    var myApp = firebase.initializeApp(config);

    // add users to the database
    function addUser(fullname, emailAddress) {
        var newUserKey = myApp.database().ref('users/' + firebase.auth().currentUser.uid);
        newUserKey.set({
            name: fullname,
            email: emailAddress
        });
        setTimeout(function() {
            window.location = "./home/index.html";  
        }, 4000); 
    };

    // email address/password sign-in -  event handler
    document.getElementById("button_login").addEventListener("click", function() {
        var email = document.getElementById("input_login_email_address").value;
        var password = document.getElementById("input_login_password").value;

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // handling errors for authentication
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
    });

    // google sign-in - event handler
    document.getElementById("img_google_logo").addEventListener("click", function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
        provider.addScope('email');
        provider.addScope('https://www.googleapis.com/auth/plus.me');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var userEmail = result.user.email;
            var userName = result.additionalUserInfo.profile.name;
            var userId = result.user.uid;

            myApp.database().ref('users').child(userId).once('value', function(snapshot) {
                if (snapshot.val() === null) {
                    addUser(userName,userEmail);
                }
                else {
                    window.location = "./home/index.html"; 
                }
            }); 
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error: " + errorCode);
            console.log("Error Message: " + errorMessage);
            // ...
        });
    });

    // join - even handler
    document.getElementById("button_join").addEventListener("click", function() {
        var fname = document.getElementById("input_join_first_name").value;
        var lname = document.getElementById("input_join_last_name").value;
        var email = document.getElementById("input_join_email_address").value;
        var password = document.getElementById("input_join_password").value;
        var confirmpassword = document.getElementById("input_join_confirm_password").value;

        if (password < 7) {
            alert("Your password must be greater than 6 characters long");
            return;
        }

        // validate the the passwords match
        if (password != confirmpassword) {
            alert("Your passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            addUser(fname + ' ' + lname,email);
        }).catch(function(error) {
            // Handling Errors for user sign-up
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage);
        });
    });

    // when a users signs-in, send them to the dashboard/homepage
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            myApp.database().ref('users').child(user.uid).once('value', function(snapshot) {
                if (snapshot.val() === null) {
                    addUser(fname + ' ' + lname,email);
                }
                setTimeout(function() {
                    window.location = "./home/index.html";  
                }, 5000);  
            });
        }
    });
};