import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import { sockets } from "../../utils/sockets.js";


class Game extends Component {
    constructor(props) {
		super(props);
		
    	this.state = {
			userID: sessionStorage.getItem("userID"),
			charList: [],
			character_id: -1,
			charName: "",
			dexterity: 0,
			hitPoints: 0,
			initBonus: 0,
			conditions: "",
			gameList: [],
			gameButtonDisplay: "toggleDisplayOff",
			gameCharList: [],
			gameName: "",
			chosenList: [],
			sentMessage: ''
		};

		sockets.listenForGameList((data) => {
			console.log("from the server", data);
			this.getGames();
		});
  	}

	createCharacter(event) {
		event.preventDefault();
		window.location ="/createCharacter";
	}
	
	createGame(event) {
		event.preventDefault();
		window.location = "/game";
	}

	componentDidMount() {
		let userID = {
			userID: this.state.userID
		};

		this.getCharacters(userID);
		this.getGames();

	}

	handleChange = event => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState({
			[name]: value
		});
	};

	getCharacters(userID) {
		API.getUserCharacters(userID)
		.then(res => {
			if (res.data.length !== 0) {
				res.data.forEach(itm => {
					itm.charDisplay = "toggleDisplayOff";
					itm.buttonColor = "btn btn-primary pull-right";
				});
				this.setState({
					charList: res.data
				});					
			}
				else {
					let noChars = [{
						character_name: "No characters found",
						charDisplay: "toggleDisplayOff",
						buttonColor: "toggleDisplayOff"
					}];
					this.setState({
						charList: noChars
					});
				}
		})
		.catch(err => console.log(err));
	}

	getGames() {
		API.getGames()
		.then(res => {
			if (res.data.length !== 0) {
				res.data.forEach(itm => {
					itm.gameDisplay = "toggleDisplayOff";
					itm.buttonColor = "btn btn-primary pull-right";
				});
				this.setState({
					gameList: res.data,
					gameButtonDisplay: "toggleDisplayOn"
				});					
			}
				else {
					let noGames = [{
						game_name: "No games",
						gameDisplay: "toggleDisplayOff",
						buttonColor: "toggleDisplayOff"
					}];
					this.setState({
						gameList: noGames,
						gameButtonDisplay: "toggleDisplayOff"
					});
				}
		})
		.catch(err => console.log(err));
	}

	editCharacter(charID) {
		let charArray = this.state.charList;
		let index = charArray.map(function(e) { return e.character_id; }).indexOf(charID);
		for (let i = 0; i < charArray.length; i++) {
			if (i !== index) {
				charArray[i].charDisplay = "toggleDisplayOff";
				charArray[i].buttonColor = "btn btn-primary pull-right";
			}
		}
		if (charArray[index].charDisplay === "toggleDisplayOn") {
			charArray[index].charDisplay = "toggleDisplayOff";
			charArray[index].buttonColor = "btn btn-primary pull-right";
			this.setState({
				charList: charArray,
				charName: "",
				dexterity: 0,
				hitPoints: 0,
				initBonus: 0,
				conditions: "",
				charID: -1
			});			
		}
			else {
				charArray[index].charDisplay = "toggleDisplayOn";
				charArray[index].buttonColor = "btn btn-success pull-right";
				this.setState({
					charList: charArray,
					charID: charArray[index].character_id,
					charName: charArray[index].character_name,
					dexterity: charArray[index].dexterity,
					hitPoints: charArray[index].hitpoints,
					initBonus: charArray[index].initiative_bonus,
					conditions: charArray[index].conditions,
				});
			}
	}

	chooseMe(info) {
		let inArray = false;
		let charIndex = 0;
		for (let i = 0; i < this.state.chosenList.length; i++) {
			if (this.state.chosenList[i].character_id === info.character_id) {
				inArray = true;
				charIndex = i;
			}
		}
		if (!inArray) {
			let newArray = this.state.chosenList;
			newArray.push(info);
			this.setState({chosenList: newArray});
		}
			else {
				let newArray = this.state.chosenList;
				newArray.splice(charIndex, 1);
				this.setState({chosenList: newArray});
			}
	}

	editGame(gameID) {
		this.setState({
			chosenList: []
		});
		API.getAllCharacters()
		.then(res => {
			if (res.data.length !== 0) {
				this.setState({
					gameCharList: res.data
				});					
			}
				else {
					let noChars = [{
						character_name: "No characters"
					}];
					this.setState({
						charList: noChars
					});
				}
			let boardID = {
				gameID: gameID
			};
			API.getBoardCharacters(boardID)
			.then(res => {
				let currentList = [];
				for (let i = 0; i < res.data[0].length; i++) {
					currentList.push(res.data[0][i]);
				}
				this.setState({
					chosenList: currentList
				})
			});
		})
		.catch(err => console.log(err));
		let gameArray = this.state.gameList;
		let index = gameArray.map(function(e) { return e.game_id; }).indexOf(gameID);
		for (let i = 0; i < gameArray.length; i++) {
			if (i !== index) {
				gameArray[i].gameDisplay = "toggleDisplayOff";
				gameArray[i].buttonColor = "btn btn-primary pull-right";
			}
		}
		if (gameArray[index].gameDisplay === "toggleDisplayOn") {
			
			gameArray[index].gameDisplay = "toggleDisplayOff";
			gameArray[index].buttonColor = "btn btn-primary pull-right";
			this.setState({
				gameList: gameArray,
				gameName: "",
				gameID: -1
			});
		}
			else {
				gameArray[index].gameDisplay = "toggleDisplayOn";
				gameArray[index].buttonColor = "btn btn-success pull-right";
				this.setState({
					gameList: gameArray,
					gameID: gameArray[index].game_id,
					gameName: gameArray[index].game_name
				})
			}
		this.setState({
			gameList: gameArray
		});
	}

	// When the form is submitted, run the search
	updateChar = event => {
		// Preventing the default behavior of the form submit (which is to refresh the page)
		event.preventDefault();
		let charInfo =  {
			character_name: this.state.charName,
			dexterity: this.state.dexterity,
			initiative_bonus: this.state.initBonus,
			hitpoints: this.state.hitPoints,
			conditions: this.state.conditions,
			isCharacter: true,
			user_id: sessionStorage.getItem("userID"),
			character_id: this.state.charID
		};
		let userID = {
			userID: this.state.userID
		};

		API.updateCharacter(charInfo).then(res => {
			this.getCharacters(userID)
		})
		.catch(err => console.log(err));
	};

	updateGame = event => {
		event.preventDefault();
		if ((this.state.gameName.trim().length !== 0) && (this.state.chosenList.length !== 0)) {
			let gameInfo = {
				game_id: this.state.gameID,
				game_name: this.state.gameName
			};
			let boardInfo = {
				game_id: this.state.gameID,
				charList: this.state.chosenList
			};
			API.updateGame(gameInfo).then(res => {
				API.updateBoard(boardInfo).then(res => {
					this.getGames();
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));	
		}
	}

	deleteGame(game_id) {
		console.log("I'm about to delete", game_id);
		let gameID = {
			game_id: game_id
		};
		API.deleteGame(gameID).then(res => {
			API.deleteBoard(gameID).then(res => {
				this.getGames();
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	}

    render() {
    	return (
			<div>
				<TopNav />
				<div className="container">
					<div className="row">
						<div className="col-sm-12 headerText text-center">
							<span className="topStyle">Dashboard</span>
						</div>
					</div>
				</div>
				<div className="container dashText">
					<div className="row">
						<div className = "col-sm-12 col-md-4 col-md-offset-1">
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-body text-center">
										Your Characters:
									</div>
								</div>
							</div>
							<div className="row">
								<div className="panel panel-default">
									<div className="panel-body fixed-panel">
										{this.state.charList.map(info => (
											<div>
												<div className = "row">
													<div className = "col-sm-12 top-buffer">
														{info.character_name}
														<a className={info.buttonColor} onClick={() => this.editCharacter(info.character_id)}><span className="buttonText">Edit</span></a>
													</div>
												</div>
												<div className={info.charDisplay}>
													<div className="row">
														<div className="col-sm-12">
															<form className="form-horizontal formText">
																<label>
																	Character Name{this.state.character_name}:
																	<input
																		name="charName"
																		id="charName"
																		type="text"
																		placeholder={info.character_name}
																		value={this.state.charName}
																		onChange={this.handleChange}
																		required
																	/>
																</label>
																<label>
																	Initiative Bonus:
																	<input
																		name="initBonus"
																		id="initBonus"
																		type="text"
																		placeholder={info.initiative_bonus}
																		value={this.state.initBonus}
																		onChange={this.handleChange}
																		required />
																</label>
																<label>
																	Dexterity Bonus:
																	<input
																		name="dexterity"
																		id="dexterity"
																		type="text"
																		placeholder={info.dexterity}
																		value={this.state.dexterity}
																		onChange={this.handleChange}
																		required />
																</label>
																<label>
																	Hit Point Damage:
																	<input
																		name="hitPoints"
																		id="hitPoints"
																		type="text"
																		placeholder={info.hitpoints}
																		value={this.state.hitPoints}
																		onChange={this.handleChange}
																	/>
																</label>
																<label>
																	Conditions:
																	<textarea
																		name="conditions"
																		id="conditions"
																		placeholder={info.conditions}
																		value={this.state.conditions}
																		onChange={this.handleChange}
																	/>
																</label>
																<div className="row">
																	<div className = "col-sm-12">
																		<button onClick={this.deleteChar} className="btn btn-primary pull-left" type="submit" value="Delete"><span className="buttonText">Delete</span></button>
																		<button onClick={this.updateChar} className="btn btn-primary pull-right" type="submit" value="Save"><span className="buttonText">Save</span></button>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
												<hr />
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="row">
								<div className = "col-sm-12">
									<button className="btn btn-primary center-block" onClick={this.createCharacter} type="submit" value="CreateCharacter"><span className="buttonText">Create New Character</span></button>
								</div>
							</div>
						</div>
						<div className = "col-sm12 col-md-4 col-md-offset-2">
							<div className = "row">
							<div className = "panel panel-default">
								<div className = "panel-body text-center">
									Available Games:
								</div>
							</div>
							</div>
							<div className = "row">
								<div className = "panel panel-default">
									<div className = "panel-body fixed-panel">
										{this.state.gameList.map(info => (
											<div>
												<div className = "row">
													<div className = "col-sm-6 top-buffer">
														{info.game_name}
													</div>
													<div className = "col-sm-6 top-buffer">
														<div className={this.state.gameButtonDisplay}>
															<div className="btn-toolbar pull-right">
																<a className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.deleteGame(info.game_id)}}><span className="buttonText">Delete</span></a>
																<a className={info.buttonColor} onClick={() => this.editGame(info.game_id)}><span className="buttonText">Edit</span></a>
															</div>
														</div>
													</div>
												</div>
												<div className={info.gameDisplay}>
													<div className="row">
														<div className="col-sm-12">
															<form className="form-horizontal formText">
																<label>
																	Game Name:
																	<input
																		name="gameName"
																		id="gameName"
																		type="text"
																		placeholder={info.game_name}
																		value={this.state.gameName}
																		onChange={this.handleChange}
																		required
																	/>
																</label>
																<div className="row">
																	<div className="panel panel-default">
																		<div className="text-center">
																			Chosen Characters
																		</div>
																		<div className = "panel-body">
																			<div className = "row">
																				{this.state.chosenList.map(info => (
																					<div className = "col-sm-4 text-center">
																						{info.character_name}
																					</div>
																				))}
																			</div>
																		</div>
																	</div>
																</div>
																<div className="row">
																	<div className="panel panel-default">
																		<div className="panel-body">
																			{this.state.gameCharList.map(info => (
																				<div className = "row">
																					<div className = "col-sm-12 text-center">
																						<button className="btn btn-primary bottomPadding" onClick={(event) => {event.preventDefault(); this.chooseMe(info)}}><span className="buttonText">{info.character_name}</span></button>
																					</div>
																				</div>
																			))}
																		</div>
																	</div>
																</div>
																<div className="row">
																	<div className="col-sm-12">
																		<button onClick={this.deleteGame} className="btn btn-primary pull-left" type="submit" value="Delete"><span className="buttonText">Delete</span></button>
																		<button onClick={this.updateGame} className="btn btn-primary pull-right" type="submit" value="Save"><span className="buttonText">Save</span></button>
																	</div>
																</div>
															</form>
														</div>
													</div>
												</div>
												<hr />
											</div>
										))}
									</div>
								</div>
							</div>
							<div className = "row">
								<div className = "col-sm-12">
									<button className="btn btn-primary center-block" onClick={this.createGame} type="submit" value="CreateGame"><span className="buttonText">Create New Game</span></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    	);
    }
  }

export default Game;