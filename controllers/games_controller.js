// Games Controller
var sdb = require("../models");
var exports = module.exports = {};

// Post route to insert a game into the game table
// POST to /games/create
exports.create = function(req, res) {
    // add item to game table
    sdb.Game.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            console.log("after insertion into games, the returned gameID is", data.dataValues.game_id);
            res.json(data);
        }).catch(function(err) {
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