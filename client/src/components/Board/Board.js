import React, { Component } from 'react';
import "./Board.css";
import TopNav from "../TopNav";
import Character from "../Character/Character.js";

class Board extends Component {

	state = {
		charInfo: [{
			charName: "Brian",
			initBonus: 3,
			dexterity: 16
		},
		{
			charName: "Jenny",
			initBonus: 4,
			dexterity: 14
		},
		{
			charName: "Carl",
			initBonus: 4,
			dexterity: 14
		},
		{
			charName: "Ashley",
			initBonus: 4,
			dexterity: 14
		},
		{
			charName: "Cathy",
			initBonus: 4,
			dexterity: 14
		}
		]
	}
	render() {
		return (
			<div>
				<TopNav />			
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