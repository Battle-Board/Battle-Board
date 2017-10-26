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

<<<<<<< HEAD
	
	// componentDidMount() {
	// 	this.searchGames();
	// }

		// Do a search for articles based on subject, start date, and end date
	createCharacter = (charName, initBonus, dexterity, hitPoints, conditions) => {
		API.createCharacter(charName, initBonus, dexterity, hitPoints, conditions)
			.then(res => {
				// If articles were found, set the state and set the foundArticles to true
				if (res.data.response.docs.length !== 0) {
					this.setState({
						articles: res.data.response.docs,
						foundArticles: true
					});					
				}
					// Otherwise, create a dummy entry for the articles and set the foundArticles to false
					else {
						let noArticles = [{
							web_url: "",
							snippet: "No articles found matching search terms",
							headline: {
								main: "No Articles Found"
							}
						}];
						this.setState({
							articles: noArticles,
							foundArticles: false
						});
					}
			})
			.catch(err => console.log(err));
	};

=======
>>>>>>> 38e54629358206c709a2c83901602eafd5ec2462
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
								<form>
									<label>
										Create New Game:
										<input size="100%" type="text" value={this.state.value} onChange={this.handleChange} onClick={this.handleInputChange}/>
									</label>
								</form>
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