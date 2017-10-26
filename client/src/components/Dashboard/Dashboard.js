import React, { Component } from "react";
import "./Dashboard.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import helpers from "../../utils/helpers.js"
import Character from "../Character/Character.js"


class Game extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
			value: '',
			gameList: [],
			foundGames: true
		};
  
    	this.handleChange = this.handleChange.bind(this);
		this.handleBuild = this.handleBuild.bind(this);
		this.handleBattle = this.handleBattle.bind(this);
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
								{/* {Character.props.children} */}
							</div>
						</div>
					</div>
					<div className = "col-sm12 col-md-4 col-md-offset-2">
						<div className = "panel panel-default">
							<div className = "panel-body text-center">
								{Game.children}
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
        </div>
      );
    }
  }

export default Game;