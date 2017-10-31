import React from "react";
import './Character.css';


const Character = ({ props }) =>
	<div className = "col-sm-4 charCard">
		<div class="panel panel-default">
			<div class="panel-body">
				<p className="charName">{props.charName}</p>
				<p className="bodyText">Initiative Bonus: {props.initBonus}<br />
				Dexterity Bonus: {props.dexterity}<br />
				Initiative Roll: {props.initRoll}<br />
				Final Initiative: {props.finalInit.toFixed(4)}<br />
				Hit Points:</p>
			</div>
		</div>
	</div>

export default Character;