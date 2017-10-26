import React, { Component } from "react";
import "./Game.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import Button from "./Button.js";


class Game extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
			gameName: '',
			charList: [],
			foundChars: true
		};
  
      this.handleChange = this.handleChange.bind(this);
	  this.handleBuild = this.handleBuild.bind(this);
	  this.handleBattle = this.handleBattle.bind(this);
	}
	
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
		let gameInfo =  {
			game_name: this.state.gameName,
		};
		
		API.createGame(gameInfo).then(res => {
			alert("Back from the insert")
		});
		window.location = "/dashboard";

	}
	
	handleBattle(event) {
		event.preventDefault();
		console.log("Battle for", this.state.value);
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
								<form className="form-horizontal">
									<label>
										Create New Game:
										<input width="100%" type="text" value={this.state.value} onChange={this.handleChange} />
									</label>
									<div className="row">
										<div className="panel panel-default">
											<div className="panel-body">
												{this.state.charList.map(info => (
													<div className = "row">
														<div className = "col-sm-12 checkbox">
															<label for={info.user_id}>
																<input id={info.user_id} type="checkbox" name="character" onChange={this.checkChange} value={info.user_id} />{info.character_name}
															</label>
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
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