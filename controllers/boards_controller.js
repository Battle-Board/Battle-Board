// Boards Controller

var express = require("express");

var router = express.Router();

var db = require("../models");

// Post route to insert into the board table
// POST to /boards/create
router.post("/create", function(req, res) {
    // add item to board table
    const newBody = req.body.charInfo.map((char) => {
        return {
            game_id: req.body.gameID,
            character_id: char.character_id,
            user_id: char.user_id
        }
    });

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

module.exports = router;