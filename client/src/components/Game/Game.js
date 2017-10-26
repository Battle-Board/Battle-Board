import React, { Component } from "react";
import "./Game.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
<<<<<<< HEAD
import Button from "./Button.js";

=======
import {sockets} from "../../utils/sockets";
>>>>>>> master

class Game extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
<<<<<<< HEAD
			value: '',
			gameList: [],
			foundGames: true
		};
  
=======
			gameName: '',
			charList: [],
			foundChars: true,
			chosenList: []
		};
		
>>>>>>> master
      this.handleChange = this.handleChange.bind(this);
	  this.handleBuild = this.handleBuild.bind(this);
	  this.handleBattle = this.handleBattle.bind(this);
	}
	
<<<<<<< HEAD
	// componentDidMount() {
	// 	this.searchGames();
	// }
  
    handleChange(event) {
		this.setState({value: event.target.value});
    }
  
    handleBuild(event) {
		event.preventDefault();
		console.log('Name submitted: ' + this.state.value);
	}
	
	handleBattle(event) {
		event.preventDefault();
		console.log("Battle for", this.state.value);
=======
	componentDidMount() {
		API.getAllCharacters()
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
  
    handleChange(event) {
		this.setState({gameName: event.target.value});
	}
	
	checkChange(event) {
		console.log(event.target.checked, event.target.name);
	}
  
    handleBuild(event) {
		event.preventDefault();
		let gameName =  {
			game_name: this.state.gameName
		};

		if ((gameName.game_name !== "") && (this.state.chosenList.length > 0)) {
			API.createGame(gameName).then(res => {
				console.log("Back from the insert with game_id of ", res.data.game_id);
				let boardInfo = {
					gameID: res.data.game_id,
					charInfo: this.state.chosenList
				}
				// API.creeteBoard(boardInfo);
				sockets.sendGameList(res.data);
				// window.location = "/board";			

			});	
		}
		

	}
	
	handleBattle(event) {
		console.log("Battle for", this.state.gameName);
		event.preventDefault();
		let gameName = {
			game_name: this.state.gameName
		};

		if ((gameName.game_name !== "") && (this.state.chosenList.length > 0)) {
			API.createGame(gameName).then(res => {
				console.log("back from the insert with game_id of", res.data.game_id);
				let boardInfo = {
					gameID: res.data.game_id,
					charInfo: this.state.chosenList
				}
				sockets.sendGameList(res.data);
				// window.location = "/board";			
			})
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
>>>>>>> master
	}
  
    render() {
      return (
        <div>
			<TopNav />
			<div className="container">
				<div className="row">
					<div className = "col-sm-12 col-md-6 col-md-offset-3 gameForm">
						<div className="panel panel-default">
							<div className="panel-body">
<<<<<<< HEAD
								<form>
									<label>
										Create New Game:
										<input size="100%" type="text" value={this.state.value} onChange={this.handleChange} />
									</label>
									<Button />
=======
								<form className="form-horizontal">
									<label className="text-center">
										Create New Game:
										<input width="100%" type="text" value={this.state.value} onChange={this.handleChange} />
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
												{this.state.charList.map(info => (
													<div className = "row">
														<div className = "col-sm-12 text-center">
															<button className="btn btn-primary" onClick={(event) => {event.preventDefault(); this.chooseMe(info)}}><span className="buttonText">{info.character_name}</span></button>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
>>>>>>> master
									<button onClick={this.handleBuild} className="btn btn-primary pull-left" type="submit" value="Build and Return"><span className="buttonText">Build and Return</span></button>
									<button onClick={this.handleBattle} className="btn btn-primary pull-right" type="submit" value="Build and Battle"><span className="buttonText">Build and Battle</span></button>
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

export default Game;