import React, { Component } from "react";
import "./Game.css";
import TopNav from "../TopNav";

class Game extends Component {

    state = {
        userInfo: [{
            userName: "B1",
            firstName: "Brian",
            lastName: "E"
        },
        {
            userName: "R1",
            firstName: "Richard",
            lastName: "S"
        }]
    }
}

render() {
    return (
        <div>
            <TopNav />
            <div className="New">
                <div className="container">
                    <div className="row">
                        <form>
                            <label>User ID:<input type="text" name="username" /></label>
                            <label>First Name:<input type="text" name="firstName" /></label>
                            <label>Last Name:<input type="text" name="lastName" /></label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Game;