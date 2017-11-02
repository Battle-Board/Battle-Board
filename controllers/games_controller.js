// Games Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert a game into the game table
// POST to /games/create
router.post("/create", function(req, res) {
	// add item to game table
	db.Game.create(req.body)
		// pass the result of our call
		.then(function(data) {
			res.json(data);
		}).catch(function(err) {
			res.json(err);
		});
});

router.get("/all", function(req, res) {
	db.Game.findAll({
		order: [["game_name"]]
	})
		.then(function(data) {
			res.json(data);
		}).catch(function(err) {
			res.json(err);
		})
});

router.post("/update", function(req, res) {
	let gameInfo = {
		game_name: req.body.game_name
	};
	db.Game.update(
		gameInfo,
		{
			where: {
				game_id: req.body.game_id
			}
		}).then(function(data) {
			res.json(data);
		}).catch(function(err) {
			res.json(err);
		});
});

router.post("/delete", function(req, res) {
	db.Game.destroy({
		where: {
			game_id: req.body.game_id
		}
	}).then(function(data) {
		res.json(data);
	}).catch(function(err) {
		res.json(err);
	});
});

router.post("/resetturn", function(req, res) {
	let charInfo = {
		character_id: null
	};
	console.log("the charInfo is", charInfo);
	console.log("the characterID is", req.body.character_id);
	db.Game.update(
		charInfo,
		{
			where: {
				turn_id: req.body.character_id
			}
		}).then(function(data) {
			res.json(data);
		}).catch(function(err) {
			res.json(err);
		});
});

module.exports = router;