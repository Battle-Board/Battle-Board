var sdb = require("../models");
var exports = module.exports = {}

exports.user = function(req, res) {
    // CAN PASS MORE THAN ONE OBJECT THROUGH RENDER
    console.log("AuthCont USER: ",res.locals.user.username);
    res.json(res.locals.user.username);
}

// Logout function!
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.json("hello");
    });
}