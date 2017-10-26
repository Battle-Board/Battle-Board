// Games Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert a game into the game table
// POST to /games/create
router.post("/games", function(req, res) {
    // add item to game table
    db.Game.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

router.get("/games", function(req, res) {
    db.Game.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
});

module.exports = router;