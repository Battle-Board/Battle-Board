import React, { Component } from 'react';
import "./Board.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import Character from "../Character/Character.js";
import API from "../../utils/API.js";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class Board extends Component {

	state = {
		charInfo: [{
			charName: "Brian",
			initBonus: 7,
			dexterity: 12,
			initRoll: 14,
			finalInit: 0
		},
		{
			charName: "Jenny",
			initBonus: 6,
			dexterity: 13,
			initRoll: 20,
			finalInit: 0
		},
		{
			charName: "Carl",
			initBonus: 8,
			dexterity: 17,
			initRoll: 8,
			finalInit: 0
		},
		{
			charName: "Ashley",
			initBonus: 2,
			dexterity: 10,
			initRoll: 7,
			finalInit: 0
		},
		{
			charName: "Cathy",
			initBonus: 4,
			dexterity: 11,
			initRoll: 19,
			finalInit: 0
		}
		],
		redirect: false,
		userPromise: false
	}

	componentDidMount() {
		let orderArray = this.state.charInfo;

		for (let i = 0; i < orderArray.length; i++) {
			orderArray[i].finalInit = orderArray[i].initRoll + orderArray[i].initBonus + orderArray[i].dexterity/100;
		}
		orderArray.sort(function(a, b) {
			return parseFloat(a.finalInit) - parseFloat(b.finalInit);
		}).reverse();
		this.setState({charinfo: orderArray});

		API.userLoggedIn()
		.then(res => {
			this.setState({userPromise: true});
			console.log("Got res from API in Dashboard: ",res);
			if(res.data.status === "4xx") {
				this.setState({redirect: true});
			}
		})
		.catch(err => {
			console.log("Error from API in Dashboard: ",err);
			this.setState({redirect: true});
		});
	}

	getRender() {
		const { redirect } = this.state;
		if(redirect) {
			return <Redirect to="/login-signup"/>;
		}
		return (
			<div>
				<TopNav/>
				<div className="Board">
					<div className="container">
						<div className = "row">
								{this.state.charInfo.map(info => (
									<Character props={info} />
								))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { userPromise } = this.state;
		return userPromise ? this.getRender() : (<span>Loading...</span>);
	}		
}



export default Board;