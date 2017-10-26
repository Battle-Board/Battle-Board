import React, { Component } from 'react';
import TopNav from "../TopNav/TopNav.js";
import API from "../../utils/API.js";
import ReactDOM from 'react-dom';
import './LogReg.scss';
import { Switch, Route, Link} from 'react-router-dom';

class LogReg extends Component{
    state = {
        username: "",
        password: "",
        email: ""
    }
    
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

    handleFormSubmit = event => {
        event.preventDefault();
        // console.log("Username: ",this.state.username," Password: ",this.state.password," Email: ",this.state.email);
        API.createUser({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }).then(res => {console.log("Created User!",res);}).catch((err) => {console.log("Res anything?: ","Some Error: ",err);});
    }
    
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
                        <input type="text" className="inputFields" id="username" name="username" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} required/>
                        </li>
                        <li>
                        <label for="password"></label>
                        <input type="password" className="inputFields" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} required/>
                        </li>
                        <li>
                        <label for="email"></label>
                        <input type="email" className="inputFields" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
                        </li>
                        <li id="center-btn">
                        <input type="submit" id="join-btn" name="join" alt="Join" value="Join" onClick={this.handleFormSubmit}/>
                        </li>
                    </ul>
                    </form>
                </div>
            </div>

  

            
        );
        
    }
}
export default LogReg;