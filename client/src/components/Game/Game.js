import React, { Component } from "react";
import "./Game.css";
<<<<<<< HEAD
import TopNav from "../TopNav";
import Character from "../Character/Character.js";

class Game extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      console.log('Name submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <div><TopNav />
            <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
=======
import TopNav from "../TopNav/TopNavLoggedIn";
import API from "../../utils/API.js";
import Button from "./Button.js";


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
								<form>
									<label>
										Create New Game:
										<input size="100%" type="text" value={this.state.value} onChange={this.handleChange} />
									</label>
									<Button />
									<button onClick={this.handleBuild} className="btn btn-primary pull-left" type="submit" value="Build and Return"><span className="buttonText">Build and Return</span></button>
									<button onClick={this.handleBattle} className="btn btn-primary pull-right" type="submit" value="Build and Battle"><span className="buttonText">Build and Battle</span></button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
>>>>>>> e68013a4fd5bf51ec7d218b2742c4ee9f17957f2
        </div>
      );
    }
  }

<<<<<<< HEAD
export default Game;


=======
export default Game;
>>>>>>> e68013a4fd5bf51ec7d218b2742c4ee9f17957f2
