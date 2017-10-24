// Battles Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert a character into the Character table
// POST to /characters/create
router.post("/create", function(req, res) {
    // edited chracter create to add in a chracter_name
    db.Character.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

router.get("/all", function(req, res) {
    db.Character.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
});

module.exports = router;