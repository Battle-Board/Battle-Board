import React, { Component } from 'react';
import API from "../../utils/API.js";
import "./Board.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import Character from "../Character/Character.js";

class Board extends Component {

	state = {
		charInfo: []
	}

	componentDidMount() {
		let gameID = {
			gameID: sessionStorage.getItem("gameID")
		};
		console.log("gameID is", sessionStorage.getItem("gameID"));		

		API.getBoardCharacters(gameID)
		.then(res => {
			let orderArray = [];
			for (let i = 0; i < res.data[0].length; i++) {
				let charEntry = {};
				charEntry.charName = res.data[0][i].character_name;
				charEntry.initBonus = res.data[0][i].initiative_bonus;
				charEntry.dexterity = res.data[0][i].dexterity;
				charEntry.initRoll = Math.floor(Math.random()*20 + 1);
				charEntry.finalInit = 0;
				orderArray.push(charEntry);
			}
			for (let i = 0; i < orderArray.length; i++) {
				orderArray[i].finalInit = orderArray[i].initRoll + orderArray[i].initBonus + orderArray[i].initBonus/100 + orderArray[i].dexterity/10000;
			}
			orderArray.sort(function(a, b) {
				return parseFloat(a.finalInit) - parseFloat(b.finalInit);
			}).reverse();
			this.setState({charInfo: orderArray});
		})
		.catch(err => console.log(err));
	}

	render() {
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
}



export default Board;