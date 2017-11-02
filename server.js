const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 3001;
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


// logging for request to the console
app.use(logger("dev"));

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


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}


const boardsController = require("./controllers/boards_controller.js");
const charactersController = require("./controllers/characters_controller.js");
const gamesController = require("./controllers/games_controller.js");
const usersController = require("./controllers/users_controller.js");

// for all the boards routes
app.use("/boards", boardsController);

// for all the characters routes
app.use("/characters", charactersController);

// for all the games routes
app.use("/games", gamesController);

// for all the users routes
app.use("/users", usersController);

// socket setup
io.on("connection", (client) => {
	console.log("I'm in io.on in the server.js file");
	console.log("Client.conn.id is", client.conn.id);
	client.on("message", (message) => {
        console.log("message from client", message);
        io.emit("message", message);
    });
    
    client.on("gameList", (message) => {
        console.log("message from client", message);
        io.emit("gameList", message);
	});
});


// // just a dummy GET route on our Test model
// app.get("/data", (req, res) => {
//     Test.find((err, data) => {
//         if (err) throw err; {
//             console.log(data);
//             res.json(data);
//         }
//     });
// });

// // just a post on our Test model
// app.post("/new", (req, res) => {
//     const test = new Test(req.body);
//     test.save(req.body, (err, data) => {
//         if (err) throw err;
//         res.json(data);
//     });
// });


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

http.listen(PORT, function() {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});