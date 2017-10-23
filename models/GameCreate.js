// game_id (default unique identifier auto created by sequelize), game_name

module.exports = function(sequelize, Sequelize) {
    const Game = sequelize.define("Game", {
        game_name: {
            type: Sequelize.STRING,
            unique: true
        }
    });

    Character.associate = function(models) {
        Character.belongsTo(models.UserCreate, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Character;
}