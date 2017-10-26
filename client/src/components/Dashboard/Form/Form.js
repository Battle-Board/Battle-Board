import React from "react";
import { FormBtn } from "./FormButton.js";
import { Input } from "../Input/Input.js";


const Form = props =>

	<form>
		<Input
			value={props.charName}
			onChange={props.handleInputChange}
			name="charName"
			className="form-control"
			placeholder="Character Name"
			id = "charName"
			labelName = "Character Name"
		/>
		<Input
			value={props.initBonus}
			onChange={props.handleInputChange}
			name="initBonus"
			className="form-control"
			placeholder="Initiative Bonus"
			id="initBonus"
			labelName = "Initiative Bonus"
		/>
		<Input
			value={props.dexterity}
			onChange={props.handleInputChange}
			name="dexterity"
			className="form-control"
			placeholder="Dexterity"
			id="dexterity"
			labelName = "Dexterity"
		/>
		<Input
			value={props.hitPoints}
			onChange={props.handleInputChange}
			name="hitPoints"
			className="form-control"
			placeholder="HitPoints"
			id="hitPoints"
			labelName = "Hit Points"
		/>
		<Input
			value={props.conditions}
			onChange={props.handleInputChange}
			name="conditions"
			className="form-control"
			placeholder="Conditions"
			id="conditions"
			labelName = "Conditions"
		/>
		<FormBtn
			// disabled={!(props.subject)}
			onClick={props.handleFormSubmit}
		>
			Submit
		</FormBtn>
	</form>

export default Form;
