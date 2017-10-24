const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();

//const controller = require("./controllers");

// logging for request to the console
app.use(logger("dev"));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

// const GameState = require("./models/GameState.js");

// let GameInfo = {};

// 	GameInfo.game_id = "Game 1";
// 	GameInfo.order_array = [1, 2, 3];
// 	GameInfo.turn_index = 1;

// 	// Create a new etnry for the database based off the Schema
// 	let entry = new GameState(GameInfo);

// 	// Save the entry into the database.
// 	entry.save(function(err, doc) {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});

// Set up Sequelize
const sdb = require("./models");
sdb.sequelize.sync().then(function() {
    console.log("Sequelize Connected!");
}).catch(function(err) {
    console.error("Something went wrong with Sequelize: ", err);
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


const Board = require("./models/board.js");
app.get("/games", (req, res) => {
    sdb.Board.findAll().then(data => {
        res.json(data);
    });
});

const charactersController = require("./controllers/characters_controller.js");

// for all the character routes
app.use("/characters", charactersController);



// just a dummy GET route on our Test model
app.get("/data", (req, res) => {
    Test.find((err, data) => {
        if (err) throw err; {
            console.log(data);
            res.json(data);
        }
    });
});

// just a post on our Test model
app.post("/new", (req, res) => {
    const test = new Test(req.body);
    test.save(req.body, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});


app.get("/healthcheck", function(req, res) {
    res.json({ "success": true, status: 200 })
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    if (process.env.NODE_ENV === "production") {
        res.sendFile(__dirname + "./client/build/index.html");
    } else {
        res.sendFile(__dirname + "./client/public/index.html");
    }
});

app.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});