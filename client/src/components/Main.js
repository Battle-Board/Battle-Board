import React from 'react'
import ReactDOM from 'react-dom';
// import { Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Home/Home.js'
// import CharacterCreation from './CharacterCreation'
import Game from "./Game/Game.js";
import Board from "./Board/Board.js";
import LogReg from "./LogReg/LogReg.js";
import Dashboard from "./Dashboard/Dashboard.js";
import CharacterInfo from "./Dashboard/CharacterInfo.js";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
	<Switch>
		<Route exact path='/' component={Home}/>
		{/* <Route path="/character" component={CharacterCreation}/> */}
		<Route path="/game" component={Game}/>
		<Route path="/board" component={Board}/>
		<Route path="/LogReg" component={LogReg}/>
		<Route path="/dashboard" component={Dashboard}/>
		<Route path="/createCharacter" component={CharacterInfo}/>
    </Switch>
)

export default Main
