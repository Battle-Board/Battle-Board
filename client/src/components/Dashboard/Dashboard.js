import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";


class Game extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
			gameList: [],
			foundGames: false,
			charList: [],
			foundChars: false
		};
  	}
	
	// componentDidMount() {
	// 	this.searchGames();
	// }

	createCharacter(event) {
		event.preventDefault();
		window.location ="/createCharacter";
	}
	
	createGame(event) {
		event.preventDefault();
		window.location = "/games";
	}

	componentDidMount() {
		API.getCharacters()
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
							<div className="panel panel-default">
								<div className="panel-body text-center">
									Your Characters:
								</div>
							</div>
						</div>
						<div className = "col-sm12 col-md-4 col-md-offset-2">
							<div className = "panel panel-default">
								<div className = "panel-body text-center">
									Your Games:
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className = "col-sm-12 col-md-4 col-md-offset-1">
							<div className="panel panel-default">
								<div className="panel-body text-center">
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
						<div className = "col-sm12 col-md-4 col-md-offset-2">
							<div className = "panel panel-default">
								<div className = "panel-body text-center">
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
					</div>
					<div className="row">
						<div className = "col-sm-12 col-md-4 col-md-offset-1">
							<button className="btn btn-primary center-block" onClick={this.createCharacter} type="submit" value="CreateCharacter"><span className="buttonText">Create New Character</span></button>
						</div>
						<div className = "col-sm12 col-md-4 col-md-offset-2">
							<button className="btn btn-primary center-block" type="submit" value="CreateGame"><span className="buttonText">Create New Game</span></button>
						</div>
					</div>
				</div>
			</div>
    	);
    }
  }

export default Game;