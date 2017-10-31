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

	getUserCharacters: function(userID) {
		return axios.post("/characters/user/", userID).then((characters) => {
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

	getBoardCharacters: function(gameID) {
		return axios.post("/boards/characters", gameID).then((characters) => {
			return characters;
		});
	},

	updateCharacter: function(charInfo) {
		return axios.post("/characters/update", charInfo).then((characters) => {
			return characters;
		});
	},

	updateGame: function(gameInfo) {
		return axios.post("/games/update", gameInfo).then((games) => {
			return games;
		});
	},

	updateBoard: function(boardInfo) {
		return axios.post("/boards/update", boardInfo).then((boards) => {
			return boards;
		});
	},

	deleteGame: function(gameID) {
		return axios.post("/games/delete", gameID).then((games) => {
			return games;
		});
	},

	deleteBoard: function(gameID) {
		return axios.post("/boards/delete", gameID).then((games) => {
			return games;
		});
	}
};