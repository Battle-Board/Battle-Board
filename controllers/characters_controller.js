// Battles Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// const io = require("socket.io");

// Post route to insert a character into the Character table
// POST to /characters/create
router.post("/characters", function(req, res) {
    // add item to character table
    db.Character.create(req.body)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

<<<<<<< HEAD
router.get("/characters", function(req, res) {
    db.Character.findAll({})
=======
router.post("/user", function(req, res) {
    db.Character.findAll({
        where: {
            user_id: req.body.userID
        },
        order: [["character_name"]]
    })
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
});

router.get("/all", function(req, res) {
    db.Character.findAll({
        order: [["character_name"]]
    })
>>>>>>> 38e54629358206c709a2c83901602eafd5ec2462
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
});

module.exports = router;