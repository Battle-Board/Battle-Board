import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import { sockets } from "../../utils/sockets.js";


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
		// API.userID.then if OK, set to this.state.userID if not, bad things;

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
							</div>
						</div>
					</div>
				</div>
			</div>
    	);
    }
  }

export default Game;