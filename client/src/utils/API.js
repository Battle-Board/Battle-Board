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
		return axios.post("/boards/create", boardInfo).then((data) => {
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
	}
};