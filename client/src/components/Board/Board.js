import React, { Component } from 'react';
import API from "../../utils/API.js";
import "./Board.css";
import TopNav from "../TopNav/TopNavLoggedIn";
import Character from "../Character/Character.js";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class Board extends Component {

	state = {
		charInfo: [],
		redirect: false,
		userPromise: false,
		uniqueValue: 0,
		update: false,
	}

	componentDidMount() {
		let orderArray = this.state.charInfo;

		for (let i = 0; i < orderArray.length; i++) {
			orderArray[i].finalInit = orderArray[i].initRoll + orderArray[i].initBonus + orderArray[i].dexterity/100;
		}
		orderArray.sort(function(a, b) {
			return parseFloat(a.finalInit) - parseFloat(b.finalInit);
		}).reverse();
		this.setState({charinfo: orderArray});

		API.userLoggedIn()
		.then(res => {
			this.setState({userPromise: true});
			console.log("Got res from API in Dashboard: ",res);
			if(res.data.status === "4xx") {
				this.setState({redirect: true});
			}
		})
		.catch(err => {
			console.log("Error from API in Dashboard: ",err);
			this.setState({redirect: true});
		});
		let gameID = {
			gameID: localStorage.getItem("gameID")
		};
		API.getBoardCharacters(gameID)
		.then(res => {
			console.log("res.data[0] is", res.data[0]);
			let orderArray = [];
			for (let i = 0; i < res.data[0].length; i++) {
				let charEntry = {};
				charEntry.uniqueValue = i;
				charEntry.charName = res.data[0][i].character_name;
				charEntry.initBonus = res.data[0][i].initiative_bonus;
				charEntry.dexterity = res.data[0][i].dexterity;
				charEntry.initRoll = Math.floor(Math.random()*20 + 1);
				charEntry.finalInit = 0;
				charEntry.hitPoints = res.data[0][i].hitpoints;
				orderArray.push(charEntry);
			}
			for (let i = 0; i < orderArray.length; i++) {
				orderArray[i].finalInit = orderArray[i].initRoll + orderArray[i].initBonus + orderArray[i].dexterity/100;
			}
			orderArray.sort(function(a, b) {
				return parseFloat(a.finalInit) - parseFloat(b.finalInit);
			}).reverse();
			this.setState({charInfo: orderArray});
		})
		.catch(err => console.log(err));
	}

	incrementUnique(e)  {
		e.preventDefault();
		let uniqueVal = this.state.uniqueValue + 1;
		if(uniqueVal >= this.state.charInfo.length) {
			console.log("I am in here!");
			this.setState({uniqueValue: 0});
		}else {
			this.setState({uniqueValue: uniqueVal});
		}
	}

	decrementUnique(e)  {
		e.preventDefault();
		let uniqueVal = this.state.uniqueValue - 1;
		let highestVal = this.state.charInfo.length -1;
		if(uniqueVal < 0) {
			console.log("I am in here!");
			this.setState({uniqueValue: highestVal});
		}else {
			this.setState({uniqueValue: uniqueVal});
		}
	}

	edit(e) {
		e.preventDefault();
		console.log("in edit");
		this.setState({update: true});
	}

	conditonalEditing(info) {
		if(this.state.update === true && this.state.uniqueValue === info.uniqueValue) {
			return (<div class="row">
			<div class="char-info col-xs-12">
				<ul>
					<li><span class="attribute">Dexterity: </span><input class="boardIn" type="text" name="dexterity" value={info.dexterity}/></li>
					<li><span class="attribute">Init Bonus: </span><input class="boardIn" type="text" name="initBonus" value={info.initBonus}/></li>
					<li><span class="attribute">Init Roll: </span><input class="boardIn" type="text" name="initRoll" value={info.initRoll}/></li>
					<li><span class="attribute">Final Init: &nbsp;</span> {info.finalInit}</li>
					<li><span class="attribute">Hit Points: </span><input class="boardIn" type="text" name="hitPoints" value={info.hitPoints}/></li>
					<li><span class="attribute">UNIQUE VALUE: </span><input class="boardIn" type="text" name="uniquevalue" value={info.uniqueValue}/></li>
					<li><span class="attribute">Conditions: </span><input class="boardIn" type="text" name="condition" value="someText"/></li>
				</ul>
			</div>
		</div>);
		}else if(this.state.update === false || this.state.update === true) {
			return (<div className="row">
			<div className={"char-info col-xs-12 "+(info.uniqueValue === this.state.uniqueValue?("active-player"):("not-active"))}>
				<ul>
					<li>Dexterity: {info.dexterity}</li>
					<li>Init Bonus: {info.initBonus}</li>
					<li>Init Roll: {info.initRoll}</li>
					<li>Final Init: {info.finalInit}</li>
					<li>Hit Points: {info.hitPoints}</li>
					<li>UNIQUE VALUE: {info.uniqueValue}</li>
					<li>Conditions: someText</li>
				</ul>
			</div>
		</div>);
		}
	}

	updateCharacter(e){
		e.preventDefault();
		this.setState({update: false});
	}

	nextEditUpdate(info) {
		if(info.uniqueValue === this.state.uniqueValue && this.state.update === true) {
			return (<div><span onClick={(e) => this.updateCharacter(e)}><a>UPDATE</a></span></div>)
		}else if(info.uniqueValue === this.state.uniqueValue) {
			return (<div><span onClick={(e) => this.decrementUnique(e)}><a>&lt; Previous</a></span> | <span onClick={(e) => this.edit(e)}><a>Edit</a></span> | <span onClick={(e) => this.incrementUnique(e)}><a>Next ></a></span></div>)			
		}else {
			return(<div><span>{'\u00A0'}</span></div>)
		}			
	}

	getRender() {
		const { redirect } = this.state;
		const { update } = this.state;
		if(redirect) {
			return <Redirect to="/login-signup"/>;
		}
		return (
			<div>
				<TopNav/>
				<div className="Board">
					<div className="container">
						<div className = "row">
								{this.state.charInfo.map(info => (
									<div className="col-12 col-md-3 char-container">
									<div className="char">
										<div className="row">
											<div className="char-name col-xs-12">Character Name: {info.charName}</div>
										</div>
										{this.conditonalEditing(info)}

										<div className="row">
											<div className="char-edit col-xs-12">
													{this.nextEditUpdate(info)}
											</div>
										</div>
									</div>
								</div>
								))}
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { userPromise } = this.state;
		return userPromise ? this.getRender() : (<span>Loading...</span>);
	}		
}



export default Board;