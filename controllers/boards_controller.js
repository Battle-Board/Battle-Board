// Boards Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert into the board table
// POST to /boards/create
router.post("/create", function(req, res) {
    // add item to board table
    console.log("req.body.charInfo is", req.body.charInfo);
    const newBody = req.body.charInfo.map((char) => {
        return {
            game_id: req.body.gameID,
            character_id: char.character_id,
            user_id: char.user_id
        }
    });
    console.log("I'm goint to add to the board with a newBody of", newBody);
    db.Board.bulkCreate(newBody)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

router.get("/all", function(req, res) {
    db.Board.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
});

router.post("/characters", function(req, res) {
    let sqlQuery = "SELECT * FROM characters WHERE character_id IN (SELECT character_id FROM boards WHERE game_id = ";
    sqlQuery += req.body.gameID;
    sqlQuery += ")";
    db.sequelize.query(sqlQuery)
        .then(function(data){
            res.json(data);})
        .catch(function(err) {
            res.json(err);
        });
});

router.post("/update", function(req, res) {
    console.log("in boards_controllers, gameID is", req.body.game_id);
    console.log("rest of body is", req.body);
    const newBody = req.body.charList.map((char) => {
        return {
            game_id: req.body.game_id,
            character_id: char.character_id,
            user_id: char.user_id
        }
    });
    console.log("newBody is", newBody);
    db.Board.destroy({
        where: {
            game_id: req.body.game_id
        }
    }).then(function() {
        db.Board.bulkCreate(newBody)
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            res.json(data);
        });
    }).catch(function(err) {
        res.json(err);
    });
});

router.post("/delete", function(req, res) {
    db.Board.destroy({
        where: {
            game_id: req.body.game_id
        }
    }).then(function(data) {
        res.json(data);
    }).catch(function(err) {
        res.json(err);
    });
});

router.post("/deletechar", function(req, res) {
    db.Board.destroy({
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