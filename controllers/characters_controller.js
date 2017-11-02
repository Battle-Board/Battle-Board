// Battles Controller
var sdb = require("../models");
var exports = module.exports = {};

// Post route to insert a character into the Character table
// POST to /characters/create
exports.create = function(req,res) {
    console.log("Inside Character Create: ",req.body);
    // add item to character table
    sdb.Character.create({
        character_name: req.body.character_name,
        dexterity: req.body.dexterity,
        initiative_bonus: req.body.initiative_bonus,
        hitpoints: req.body.hitpoints,
        conditions: req.body.conditions,
        isCharacter: true,
        UserId: res.locals.user.id
    })
        // pass the result of our call
        .then(function(data) {
            // log the result to our terminal/bash window
            console.log("Character Create Success");
            res.json(data);
        }).catch(function(err) {
            console.log("Character Create Error",err);
            res.json(err);
        });
    console.log("End of Character Create!");
};

exports.user = function(req, res) {
    sdb.Character.findAll({
        where: {
            UserId: res.locals.user.id
        },
        order: [["character_name"]]
    }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};
            res.json(err)
        });
});

exports.all = function(req, res) {
    sdb.Character.findAll({
        where: {
            isCharacter: true
        },
        order: [["character_name"]]
    }).then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};
        });
});

router.post("/update", function(req, res) {
    let newInfo = req.body;
    delete newInfo.user_id;
    delete newInfo.charcter_id;
    db.Character.update(
        newInfo,
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
