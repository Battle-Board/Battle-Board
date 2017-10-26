// Include React as a dependency
import React, { Component } from 'react'
// Include the Helper (for the saved recall)
import helpers from "../utils/helpers";
// Create the Main component
class Saved extends Component {
  state = {
    savedGames: []
  }
  // When this component mounts, get all saved games in db
  componentDidMount() {
    helpers.getSaved()
    .then((gameData) => {
      this.setState({ savedGames: gameData.data });
      console.log("saved games: ", gameData.data);
    });
  }

  handleClick = (item) => {
    helpers.deleteSaved(item.game_id, item.game_name)
    .then(() => {
      helpers.getSaved()
      .then((gameData) => {
        this.setState({ savedGames: savedGames.data });
        console.log("saved games: ", savedGames.data);
      });
    });
  }
  // A helper method for rendering the HTML when we have no saved articles
  renderEmpty = () => {
    return (
      <li className="list-group-item">
        <h3>
          <span>
            <em>Save Your Game</em>
          </span>
        </h3>
      </li>
    );
  }
  // A helper method for mapping through our articles and outputting some HTML
  renderGames = () => {
    return this.state.savedGames.map((game_id, game_name) => {
      return (
        <div key={index}>
          <li className="list-group-item">
            <h3>
              <span>
                <em>{Game.game_name}</em>
              </span>
              <span className="btn-group pull-right">
                  <button className="btn btn-default ">View Article</button>
                <button className="btn btn-primary" onClick={() => this.handleClick(game)}>Delete</button>
              </span>
            </h3>
          </li>
        </div>
      );
    });
  }
  // A helper method for rendering a container and all of our artiles inside
  renderContainer = () => {
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">
                  <strong>
                    <i className="fa fa-download" aria-hidden="true"></i> Saved Articles</strong>
                </h1>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  {this.renderGames()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Our render method. Utilizing a few helper methods to keep this logic clean
  render() {
    // If we have no articles, we will return this.renderEmpty() which in turn returns some HTML
    if (!this.state.savedGames) {
      return this.renderEmpty();
    }
    // If we have articles, return this.renderContainer() which in turn returns all saves articles
    return this.renderContainer();
  }
};
// Export the module back to the route
export default Saved;