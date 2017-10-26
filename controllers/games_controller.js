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
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
};

exports.all = function(req, res) {
    sdb.Game.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};