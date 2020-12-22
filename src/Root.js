import React from 'react';
import fire from './fire';


export class Root extends React.Component {

    
    emails(){

        var emailList = [];

        var ref = fire.database().ref("emails");


        ref.orderByChild("email").on("child_added", (snapshot) => {
          console.log(snapshot.val().email);
          if (emailList.indexOf(snapshot.val().email) === -1)
          {
            emailList.push(snapshot.val().email);
          }
        });

        var uniqueArray = Array.from(new Set(emailList));
        console.log("logging unique array:");
        console.log(uniqueArray);
        return uniqueArray;
    }


    render () {
        var emails = this.emails();
        console.log("in render");
        console.log("emails length: " + emails.length);
        document.getElementById("rootDiv").innerHTML = "";
        var header = document.createElement("h3");
        header.innerText = "Signed up emails below:";
        document.getElementById("rootDiv").appendChild(header);
        for (var i=0; i < emails.length; i++)
        {
            var p = document.createElement("p");
            p.innerHTML = emails[i];
            document.getElementById("rootDiv").appendChild(p);
        }
        return (
            <div id="rootDiv2">
            </div>
        );
    }
}

export default Root;