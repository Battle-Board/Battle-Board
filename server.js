const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session")

const PORT = process.env.PORT || 3001;
const app = express();

//const controller = require("./controllers");

// // logging for request to the console
// app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Set up Sequelize
const sdb = require("./models");
sdb.sequelize.sync().then(function() {
    console.log("Sequelize Connected!");
}).catch(function(err) {
    console.error("Something went wrong with Sequelize: ", err);
});

// Passport Sessions
app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Middleware to have a global variable for userName (res.locals.user.user_name)
app.use(function(req, res, next) {
    console.log("middleware test:",req.user);
    console.log("middleware body test: ",req.body.username);
    res.locals.user = req.user;
    if(!req.user){
        next();
    }else {
        next();
    }
  });

// Passports Requirements for Functionality
require("./routes/auth.js")(app, passport);
require("./config/passport/passport.js")(passport, sdb.User);

// Set up Mongoose
// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/battleboard", {
        useMongoClient: true
    }
);

let mdb = mongoose.connection;

mdb.on("error", function(error) {
    console.log("mongoose Error: ", error);
});

mdb.once("open", function() {
    console.log("Mongoose connection successful");
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});

module.exports = app;