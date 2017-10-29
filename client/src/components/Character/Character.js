import React from "react";
import './Character.css';

// let styleVal = 
const Character = ({ props }) =>
	<div className = "col-sm-4 charCard">
		<div className="panel panel-default">
			<div className="panel-body" id={(props.uniqueValue === 1?("activePlayer"):("notActive"))}>
				<p className="charName">{props.charName}</p>
				<p className="bodyText">Initiative Bonus: {props.initBonus}<br />
				Dexterity: {props.dexterity}<br />
				Initiative Roll: {props.initRoll}<br />
				Final Initiative: {props.finalInit}<br />
				Hit Points: {props.hitPoints}</p>
			</div>
		</div>
	</div>

export default Character;