// Battles Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// const io = require("socket.io");

// Post route to insert a character into the Character table
// POST to /characters/create
router.post("/create", function(req, res) {
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

router.post("/user", function(req, res) {
    db.Character.findAll({
        where: {
            user_id: req.body.userID
        },
        order: [["character_name"]]
    }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err)
        });
});

router.get("/all", function(req, res) {
    db.Character.findAll({
        where: {
            isCharacter: true
        },
        order: [["character_name"]]
    }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

router.post("/update", function(req, res) {
    let charInfo = {
        character_name: req.body.character_name,
        dexterity: req.body.dexterity,
        initiative_bonus: req.body.initiative_bonus,
        hitpoints: req.body.hitpoints,
        conditions: req.body.conditions,
        dexterity: req.body.dexterity
    };
    db.Character.update(
        charInfo,
        {
        where: {
            character_id: req.body.character_id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(err);
    });
});

router.post("/delete", function(req, res) {
    console.log("in controller, about to delete", req.body.character_id);
    db.Character.destroy({
        where: {
            character_id: req.body.character_id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(err);
    });
});

module.exports = router;