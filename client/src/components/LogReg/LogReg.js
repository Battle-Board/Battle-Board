import React, { Component } from 'react';
import TopNav from "../TopNav";
import ReactDOM from 'react-dom';
import './LogReg.scss';
import { Switch, Route, Link} from 'react-router-dom';

class LogReg extends Component{
    render(){
        return(
            <div>
                <TopNav/>
            
                <div className="signupSection">
                    <div className="info">
                    <h2>BattleBoard</h2>
                    <i className="icon ion-ios-ionic-outline" aria-hidden="true"></i>
                    <p>Role Playing Game</p>
                    </div>
                    <form action="#" method="POST" className="signupForm" name="signupform">
                    <h2>Sign Up</h2>
                    <ul className="noBullet">
                        <li>
                        <label for="username"></label>
                        <input type="text" className="inputFields" id="username" name="username" placeholder="Username" value="" oninput="return userNameValidation(this.value)" required/>
                        </li>
                        <li>
                        <label for="password"></label>
                        <input type="password" className="inputFields" id="password" name="password" placeholder="Password" value="" oninput="return passwordValidation(this.value)" required/>
                        </li>
                        <li>
                        <label for="email"></label>
                        <input type="email" className="inputFields" id="email" name="email" placeholder="Email" value="" required />
                        </li>
                        <li id="center-btn">
                        <input type="submit" id="join-btn" name="join" alt="Join" value="Join" />
                        </li>
                    </ul>
                    </form>
                </div>
            </div>

  

            
        );
        
    }
}
export default LogReg;







var alertRedInput = "#8C1010";
var defaultInput = "rgba(10, 180, 180, 1)";

function userNameValidation(usernameInput) {
    var username = document.getElementById("username");
    var issueArr = [];
    if (/[-!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(usernameInput)) {
        issueArr.push("No special characters!");
    }
    if (issueArr.length > 0) {
        username.setCustomValidity(issueArr);
        username.style.borderColor = alertRedInput;
    } else {
        username.setCustomValidity("");
        username.style.borderColor = defaultInput;
    }
}

function passwordValidation(passwordInput) {
    var password = document.getElementById("password");
    var issueArr = [];
    if (!/^.{7,15}$/.test(passwordInput)) {
        issueArr.push("Password must be between 7-15 characters.");
    }
    if (!/\d/.test(passwordInput)) {
        issueArr.push("Must contain at least one number.");
    }
    if (!/[a-z]/.test(passwordInput)) {
        issueArr.push("Must contain a lowercase letter.");
    }
    if (!/[A-Z]/.test(passwordInput)) {
        issueArr.push("Must contain an uppercase letter.");
    }
    if (issueArr.length > 0) {
        password.setCustomValidity(issueArr.join("\n"));
        password.style.borderColor = alertRedInput;
    } else {
        password.setCustomValidity("");
        password.style.borderColor = defaultInput;
    }
}