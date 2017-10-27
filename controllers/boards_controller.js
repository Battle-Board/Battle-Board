// Boards Controller
var sdb = require("../models");
var exports = module.exports = {};

// Post route to insert into the board table
// POST to /boards/create
exports.create = function(req, res) {
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
};

exports.all = function(req, res) {
    sdb.Board.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        });
};

exports.characters = function(req, res) {
    let sqlQuery = "SELECT * FROM characters WHERE character_id IN (SELECT character_id FROM boards WHERE game_id = ";
    sqlQuery += req.body.gameID;
    sqlQuery += ")";
    sdb.sequelize.query(sqlQuery)
        .then(function(data){
            res.json(data);})
        .catch(function(err) {
            res.json(err);
        });
};
