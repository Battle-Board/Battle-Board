var sdb = require("../models");
var exports = module.exports = {};

exports.user = function(req, res) {
    // CAN PASS MORE THAN ONE OBJECT THROUGH RENDER
    console.log(req.body.username);
    res.json("The Value: "+req.body.username");
}

// Logout function!
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
}