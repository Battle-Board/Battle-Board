// Users Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert a user into the user table
// POST to /users/create
router.post("/users", function(req, res) {
    // add item to users table
    db.User.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

router.get("/users", function(req, res) {
    db.User.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
});

module.exports = router;