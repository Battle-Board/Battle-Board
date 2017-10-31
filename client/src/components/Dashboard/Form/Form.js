import React from "react";
import { FormBtn } from "./FormButton.js";
import { Input } from "../Input/Input.js";
import "../Input/Input.css";


const Form = props =>

	<form>
		<Input
			type="text"
			width = "100%"
			value={props.charName}
			onChange={props.handleInputChange}
			name="charName"
			className="form-control"
			placeholder="Character Name"
			id = "charName"
			labelname = "Character Name"
		/>
		<Input
			value={props.initBonus}
			onChange={props.handleInputChange}
			name="initBonus"
			className="form-control"
			placeholder="Initiative Bonus"
			id="initBonus"
			labelname = "Initiative Bonus"
		/>
		<Input
			value={props.dexterity}
			onChange={props.handleInputChange}
			name="dexterity"
			className="form-control"
			placeholder="Dexterity Bonus"
			id="dexterity"
			labelname = "Dexterity Bonus"
		/>
		<Input
			value={props.hitPoints}
			onChange={props.handleInputChange}
			name="hitPoints"
			className="form-control"
			placeholder="HitPoints"
			id="hitPoints"
			labelname = "Hit Point Damage"
		/>
		<Input
			type="textarea"
			value={props.conditions}
			onChange={props.handleInputChange}
			name="conditions"
			className="form-control"
			placeholder="Conditions"
			id="conditions"
			labelname = "Conditions"
		/>
		<FormBtn
			// disabled={!(props.subject)}
			onClick={props.handleFormSubmit}
		>
			Submit
		</FormBtn>
	</form>

export default Form;
