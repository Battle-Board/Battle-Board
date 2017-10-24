// game_id (default unique identifier auto created by sequelize), game_name

module.exports = function(sequelize, Sequelize) {
    const Game = sequelize.define("Game", {
        game_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        game_name: {
            type: Sequelize.STRING,
            unique: true
        }
    });

    Game.associate = function(models) {
        Game.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Game;
}