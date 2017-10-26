import axios from "axios";


export default {

	searchGames: function() {
		return axios.get("/games").then((games) => {
			return games;
		});
	},

	createGame: function(gameName) {
		return axios.post("/saveGame", gameName).then((games) => {
			return games;
		});
	},

	createCharacter: function(charName, initBonus, dexterity, hitPoints, conditions) {
		return axios.post("/characters/create", charName, initBonus, dexterity, hitPoints, conditions).then((data) => {
			return data;
		});
	},

	createUser: function(data) {
		console.log("In create user!");
		return axios.post("/signup", data);
	}
};

// // User Routes
// app.get("/users/all", usersController.all);

// // Character Routes
// app.post("/characters/create", charactersController.create);
// app.get("/characters/all", charactersController.all);

// // Game Routes
// app.post("/games/create", gamesController.create);
// app.get("/games/all", gamesController.all);

// // Board Routes
// app.post("/boards/create", boardsController.create);
// app.get("/boards/all", boardsController.all);