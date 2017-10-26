import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import Form from "./Form/Form.js";


class CharacterInfo extends Component {

	state = {
		charName: "",
		initBonus: 0,
		dexterity: 0,
		hitPoints: 0,
		conditions: ""
	}

	
	// componentDidMount() {
	// 	this.searchGames();
	// }


	// Whenever anything in the Form is updated, update the state so the search can be done
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};
  
	// When the form is submitted, run the search
	handleFormSubmit = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		let charInfo =  {
			character_name: this.state.charName,
			dexterity: this.state.dexterity,
			initiative_bonus: this.state.initBonus,
			hitpoints: this.state.hitPoints,
			conditions: this.state.conditions,
			isCharacter: true,
			user_id: 1
		};

		API.createCharacter(charInfo);
		window.location = "/dashboard";
	};

    render() {
      return (
        <div>
			<TopNav />
			<div className="container">
				<div className="row">
					<div className = "col-sm-12 col-md-6 col-md-offset-3 gameForm">
						<div className="panel panel-default">
							<div className="panel-body">
								<Form
									charName={this.state.charName}
									initBonus={this.state.initBonus}
									dexterity={this.state.dexterity}
									hitPoints={this.state.hitPoints}
									conditions={this.state.conditions}
									handleInputChange={this.handleInputChange}
									handleFormSubmit={this.handleFormSubmit}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
        </div>
      );
    }
  }

export default CharacterInfo;