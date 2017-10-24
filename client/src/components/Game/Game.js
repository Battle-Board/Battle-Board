import React, { Component } from "react";
import "./Game.css";
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
        </div>
      );
    }
  }

export default Game;


