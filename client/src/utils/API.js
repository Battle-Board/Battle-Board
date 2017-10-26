import axios from "axios";

<<<<<<< HEAD

=======
>>>>>>> master
export default {

	searchGames: function() {
		return axios.get("/games").then((games) => {
			return games;
		});
	},

	createGame: function(gameName) {
<<<<<<< HEAD
		return axios.post("/saveGame", gameName).then((games) => {
=======
		return axios.post("/games/create", gameName).then((games) => {
>>>>>>> master
			return games;
		});
	},

<<<<<<< HEAD
	createCharacter: function(charName, initBonus, dexterity, hitPoints, conditions) {
		return axios.post("/characters/create", charName, initBonus, dexterity, hitPoints, conditions).then((data) => {
=======
	createCharacter: function(charInfo) {
		return axios.post("/characters/create", charInfo).then((data) => {
>>>>>>> master
			return data;
		});
	},

<<<<<<< HEAD
	createUser: function(data) {
		console.log("In create user!");
		return axios.post("/signup", data);
	},

	userLoggedIn: function() {
		console.log("userLoggedIn right before axios call");
		return axios.get("/auth/userid").then((user) => {
			console.log("Inside API userId: ",user.data.id," and username: ",user.data.username);
			return user;
		}).catch(err => console.log("Error in userLoggedIn: ",err));
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
=======
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
	// search: function(query, start_date, end_date) {
	//   let fullQuery = query;
	//   if (start_date) {
	// 	  fullQuery = fullQuery + "&start_date=" + start_date.trim() + "0101";
	//   }
	//   if (end_date) {
	// 	  fullQuery = fullQuery + "&end_date=" + end_date.trim() + "1231";
	//   }
	// return axios.get(BASEURL + APIKEY + fullQuery);
	// },

	// saveArticle: function(article) {
	// 	return axios.post("/saved", article).then((data)=>{
	// 		return data;
	// 	});
	// },

	// getSavedArticles: function() {
	// 	return axios.get("/getSaved").then((articles) => {
	// 		return articles;
	// 	});
	// },

	// deleteArticle: function(article) {
	// 	return axios.post("/deleteArticle", article).then((data)=>{
	// 		return data;
	// 	});
	// }
};
>>>>>>> master
