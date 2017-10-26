// Games Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert a game into the game table
// POST to /games/create
router.post("/create", function(req, res) {
    console.log("req.body is", req.body);
    // add item to game table
    db.Game.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            console.log("after insertion into games, the returned gameID is", data.dataValues.game_id);
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

module.exports = router;