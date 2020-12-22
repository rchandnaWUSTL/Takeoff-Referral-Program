import React, { useState, useEffect } from "react";
import fire from './fire'
import './App.css';
import Login from "./Login";
import Hero from './hero';

const App = () => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState('');
  const [referEmail, setReferEmail] = useState('');
  const [code, setCode] = useState('');



  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/Invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });

  };

  const handleSignup = () => {
    clearErrors();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {

        switch (err.code) {
          case "auth/email-already-in-use":

          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;

        }
      });

    //THIS SHOULD ONLY EXECUTE IF THERE WAS NO ERROR  IE. DID NOT ENTER CATCH
    var databaseRef = fire.database().ref("user");
    var newUser = databaseRef.push();
    newUser.set({
      email: email,
      referrals: 0,
      code: newUser.key
    });




    // fire.database().ref("user").push(({
    //     email: email,
    //     referrals : 0,

    //   }))

    // function writeUserData(userId, email, referrals) {
    //   fire.database().ref('users/' + userId).push({
    //     email: email,
    //     referrals : 0
    //   });
    // }



  };

  const handleReferral = () => {
    //CHECK IF EMAIL IS A VALID FORM


    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(referEmail)) {
      alert("Invalid Email");
      return;
    }
    else {

      document.getElementById("email_refer_form").value = "";
      document.getElementById("code_refer_form").value = "";

      var ref = fire.database().ref("emails");

      var count = 0;


      ref.orderByChild("email").equalTo(referEmail).on("child_added", function (snapshot) {
        console.log(snapshot.val().email);
        count = count + 1;
      });

      if (count == 0) {
        var referalls_value = 0;
        var databaseRef = fire.database().ref("user");
        databaseRef.once('value', function (snapshot) {
          if (snapshot.hasChild(code)) {
            var ref2 = databaseRef.child(code);
            ref2.on('value', (snapshot) => {
              referalls_value = snapshot.val().referrals;
            });

            databaseRef.child(code).update({ 'referrals': referalls_value + 1 });
            fire.database().ref("emails").push({
              email: referEmail
            });
            alert("You have successfully signed up");
          }
          else {
            alert("Invalid Code");
          }

        });
      }
      else {
        alert("Email already signed up");
      }
    }
  };

  const handleLogout = () => {
    document.getElementById("rootDiv").innerHTML = "";
    fire.auth().signOut();

  };

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      }
      else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();

  }, []);


  return (
    <div className="App">
      {user ? (
        <Hero
          handleLogout={handleLogout}
          user={user}
        />
      ) : (
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            referEmail={referEmail}
            setReferEmail={setReferEmail}
            code={code}
            setCode={setCode}
            handleReferral={handleReferral}
          />
        )}
    </div>
  );

};


export default App;
