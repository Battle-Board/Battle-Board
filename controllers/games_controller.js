// Games Controller
var sdb = require("../models");
var exports = module.exports = {};

// Post route to insert a game into the game table
// POST to /games/create
exports.create = function(req, res) {
    // add item to game table
    sdb.Game.create({
        game_id: req.body.game_id,
        game_name: req.body.game_name,
        UserId: res.locals.user.id
    })
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            console.log("after insertion into games, the returned gameID is", data.dataValues.game_id);
            res.json(data);
        }).catch(function(err) {
            console.log("Game Create Error: ",err)
            res.json(err);
        });
};

exports.all = function(req, res) {
    sdb.Game.findAll({
        order: [["game_name"]]
    })
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};
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
