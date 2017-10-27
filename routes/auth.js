const authController = require("../controllers/authcontroller.js");
const boardsController = require("../controllers/boards_controller.js");
const charactersController = require("../controllers/characters_controller.js");
const gamesController = require("../controllers/games_controller.js");
const usersController = require("../controllers/users_controller.js");

module.exports = function(app, passport) {
    // User Routes
    app.get("/users/all", usersController.all);

    // Character Routes
    app.post("/characters/create", charactersController.create);
    app.get("/characters/user", charactersController.user);
    app.get("/characters/all", charactersController.all);

    // Game Routes
    app.post("/games/create", gamesController.create);
    app.get("/games/all", gamesController.all);

    // Board Routes
    app.post("/boards/create", boardsController.create);
    app.get("/boards/all", boardsController.all);

    // Passport Routes
    app.post("/signup", passport.authenticate('local-signup'), function(req, res) {
        console.log("In function after passport!",res.locals.user);
        res.json(req.user.dataValues.username);
    });

    app.get("/signup", usersController.all);

    // AuthController Routes
    app.get("/auth/logout", authController.logout);
    app.get("/auth/userid", authController.user);

    // Send every request to the React app
    // Define any API routes before this runs

    app.get("*", (req, res) => {
        if (process.env.NODE_ENV === "production") {
            res.sendFile(__dirname + "./client/build/index.html");
        } else {
            res.sendFile(__dirname + "./client/public/index.html");
        }
    });

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) return next();
        res.json(req.user.dataValues.username);
    }
}