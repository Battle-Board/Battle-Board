// Boards Controller
var db = require("../models");
var exports = module.exports = {};

// Post route to insert into the board table
// POST to /boards/create
exports.create = function(req, res) {
    // add item to board table
    db.Board.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
};

exports.all = function(req, res) {
    db.Board.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};