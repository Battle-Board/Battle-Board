const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");

const PORT = process.env.PORT || 3001;
const app = express();

// grabbing our test model
const sdb = require("./models");
sdb.sequelize.sync().then(function() {
    console.log("Sequelize Connected!");
}).catch(function(err) {
    console.error("Something went wrong with Sequelize: ", err);
});

// logging for request to the console
app.use(logger("dev"));

// Configure body parser for AJAX (AXIOS) requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Sessions
app.use(session({secret: "somevaluablesecrets", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Middleware to have a global variable for userName (res.locals.user)
app.use(function(req, res, next) {
  res.locals.user = req.user;
  if(!req.user){
      next();
  }else {
      next();
  }
});

// Passports Requirements for Functionality
require("./app/routes/auth.js")(app, passport);
require("./app/config/passport/passport.js")(passport, sdb.user);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/battleboard",
  {
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

// just a dummy GET route on our Test model
app.get("/data", (req,res) => {
  Test.find((err, data) => { 
    if(err) throw err; 
    res.json(data);
  });
});

// just a post on our Test model
app.post("/new", (req, res) => {
  const test = new Test(req.body);
  test.save(req.body, (err, data) => {
    if(err) throw err;    
    res.json(data);
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  if ( process.env.NODE_ENV === "production" ) {
    res.sendFile(__dirname + "./client/build/index.html");
  } else {
    res.sendFile(__dirname + "./client/public/index.html");
  }
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});