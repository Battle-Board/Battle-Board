// Include the Axios library for HTTP requests
import axios from "axios";
// Helper Functions
const helpers = {
  getSaved: function() {
    return axios.get("/games")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will save new articles to our database
  postSaved: function(game_id, game_name) {
    var newGame = { game_id: game_id, game_name: game_name };
    console.log('postSaved', game_id)
    return axios.post("/games", newGame)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(game_id, data) {
    return axios.delete("/games", {
      params: {
        "game_id": game_id,
        "data": data
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};
// We export the helpers function
export default helpers;