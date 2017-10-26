// Users Controller
const sdb = require("../models");
var exports = module.exports = {};

// User creation will be handled in config/passport/passport.js

// Grab all Users
exports.all = function(req, res) {
    sdb.User.findAll({})
        .then(function(data) {
            res.json(data);
        }).catch(function(err) {
            res.json(err);
        })
};