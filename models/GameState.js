// This Schema is to set game state into a document and then able to to return to the game with that state.
// Game_ID, Order_Array, Turn_Index

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GameStateSchema = new Schema({
    game_id: {
        type: String,// Add a required: true after we know it's working
    },
    order_array: {
        type: [{
            type: Number, // Add a required: true after we know it's working
        }]
    },
    turn_index: {
        type: Number, // Add a required: true after we know it's working
        default: 0
    }
});

const GameState = mongoose.model("GameState", GameStateSchema);

module.exports = GameState;