import React, { Component } from 'react';
import API from "../../utils/API.js";
import "./Board.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import Character from "../Character/Character.js";

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
		]
	}

	componentDidMount() {
		let gameID = {
			gameID: localStorage.getItem("gameID")
		};
		API.getBoardCharacters(gameID)
		.then(res => {
			console.log("res.data[0] is", res.data[0]);
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
				orderArray[i].finalInit = orderArray[i].initRoll + orderArray[i].initBonus + orderArray[i].dexterity/100;
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