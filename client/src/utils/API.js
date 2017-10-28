import axios from "axios";

export default {
	searchGames: function() {
		return axios.get("/games").then((games) => {
			return games;
		});
	},

	createGame: function(gameName) {
		return axios.post("/games/create", gameName).then((games) => {
			return games;
		});
	},

	createCharacter: function(charInfo) {
		return axios.post("/characters/create", charInfo).then((data) => {
			return data;
		});
	},

	createBoard: function(boardInfo) {
		return axios.post("/boards/create", boardInfo).then((boards) => {
			return boards;
		});
	},

	getUserCharacters: function() {
		return axios.post("/characters/user/").then((characters) => {
			return characters;
		});
	},

	getAllCharacters: function() {
		return axios.get("/characters/all/").then((characters) => {
			return characters;
		});
	},

	getGames: function() {
		return axios.get("/games/all").then((games) => {
			return games;
		});
	},

	createUser: function(data) {
		console.log("In create user!");
		return axios.post("/signup", data);
	},

	login: function(data) {
		console.log("In login user!");
		return axios.post("/signin", data);
	},

	userLoggedIn: function() {
		console.log("userLoggedIn right before axios call");
		return axios.get("/auth/userid").then((user) => {
			console.log("Inside API userId: ",user," and username: ",user.data.username);
			return user;
		}).catch(err => console.log("Error in userLoggedIn: ",err));
	},

	logout: function() {
		console.log("In logout API call!");
		return axios.get("/auth/logout").then((res) => console.log("Logout Response: ",res)).catch(err => console.log("Logout Error: ",err));
	},

	getBoardCharacters: function(gameID) {
		return axios.post("/boards/characters", gameID).then((characters) => {
			return characters;
		});
	}
};