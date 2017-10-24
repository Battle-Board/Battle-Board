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
	}

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