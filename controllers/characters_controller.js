// Battles Controller
var sdb = require("../models");
var exports = module.exports = {};

// Post route to insert a character into the Character table
// POST to /characters/create
exports.create = function(req,res) {
    // add item to character table
    sdb.Character.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
};

exports.all =  function(req, res) {
    sdb.Character.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};
