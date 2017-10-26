import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
<<<<<<< HEAD
import helpers from "../../utils/helpers.js"
import Character from "../Character/Character.js"
=======
import { sockets } from "../../utils/sockets.js";
>>>>>>> 38e54629358206c709a2c83901602eafd5ec2462


class Game extends Component {
    constructor(props) {
		super(props);
		
    	this.state = {
			gameList: [],
			foundGames: false,
			charList: [],
			foundChars: false,
			userID: localStorage.getItem("userID"),
			sentMessage: ''
		};
  
    this.handleChange = this.handleChange.bind(this);
		this.handleBuild = this.handleBuild.bind(this);
		this.handleBattle = this.handleBattle.bind(this);
	}

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
		window.location="/game";
	}

	savedGame(event) {
		event.preventDefault();
		window.location="/api/games"
	}
  
<<<<<<< HEAD
    handleChange(event) {
		this.setState({value: event.target.value});
    }
  
    handleBuild(event) {
		event.preventDefault();
		window.location="/dashboard"
		console.log('Name submitted: ' + this.state.value);
	}
	
	handleBattle(event) {
		event.preventDefault();
		window.location="/board"
		console.log("Battle for", this.state.value);
=======
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleBuild(event) {
    event.preventDefault();
    window.location="/dashboard";
    console.log('Name submitted: ' + this.state.value);
  }

	componentDidMount() {
		let userID = {
			userID: this.state.userID
		};

		this.getCharacters(userID);
		this.getGames();

	}

	getCharacters(userID) {
		API.getUserCharacters(userID)
		.then(res => {
			if (res.data.length !== 0) {
				this.setState({
					charList: res.data,
					foundChars: true
				});					
			}
				else {
					let noChars = [{
						character_name: "No characters found"
					}];
					this.setState({
						charList: noChars,
						foundChars: false
					});
				}
		})
		.catch(err => console.log(err));
>>>>>>> 38e54629358206c709a2c83901602eafd5ec2462
	}
	getGames() {
		API.getGames()
		.then(res => {
			if (res.data.length !== 0) {
				this.setState({
					gameList: res.data,
					foundGames: true
				});					
			}
				else {
					let noGames = [{
						game_name: "No games found"
					}];
					this.setState({
						gameList: noGames,
						foundGames: false
					});
				}
		})
		.catch(err => console.log(err));
	}


    render() {
    	return (
			<div>
				<TopNav />
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
									<div className="panel-body text-center fixed-panel">
										{this.state.charList.map(info => (
											<div className = "row">
												<div className = "col-sm-12">
													<h2>{info.character_name}</h2>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
<<<<<<< HEAD
						</div>
					</div>
				</div>
				<div className="row">
					<div className = "col-sm-12 col-md-4 col-md-offset-1">
						<div className="panel panel-default">
							<div className="panel-body text-center">
								{/* {Character.props.children} */}
							</div>
						</div>
					</div>
					<div className = "col-sm12 col-md-4 col-md-offset-2">
						<div className = "panel panel-default">
							<div className = "panel-body text-center">
								{Game.children}
=======
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
									<div className = "panel-body text-center fixed-panel">
										{this.state.gameList.map(info => (
											<div className = "row">
												<div className = "col-sm-12">
													<h2>{info.game_name}</h2>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className = "row">
								<div className = "col-sm-12">
									<button className="btn btn-primary center-block" onClick={this.createGame} type="submit" value="CreateGame"><span className="buttonText">Create New Game</span></button>
								</div>
>>>>>>> 38e54629358206c709a2c83901602eafd5ec2462
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className = "col-sm-12 col-md-4 col-md-offset-1">
						<button className="btn btn-primary center-block" onClick={this.createCharacter} type="submit" value="CreateCharacter"><span className="buttonText">Create New Character</span></button>
					</div>
					<div className = "col-sm12 col-md-4 col-md-offset-2">
						<button className="btn btn-primary center-block" onClick={this.createGame} type="submit" value="CreateGame"><span className="buttonText">Create New Game</span></button>
					</div>
				</div>
			</div>
    	);
    }
  }

export default Game;