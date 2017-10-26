var sdb = require("../models");
var exports = module.exports = {};

exports.user = function(req, res) {
    // CAN PASS MORE THAN ONE OBJECT THROUGH RENDER
    console.log("In authController user: ",req.users);
    res.json(res.locals.user);
}

// Logout function!
exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
}