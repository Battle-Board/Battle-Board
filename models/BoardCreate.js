// character_id, user_id, character_name, avatar, dexterity, initiative_bonus, hitpoints, conditions

module.exports = function(sequelize, Sequelize) {
    const Board = sequelize.define("Board", {
        game_name: {
            type: Sequelize.STRING
        }, 
        character_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
    });

    // Associate so that if user deletes we can simply destroy all records
    Board.associate = function(models) {
        Board.belongsTo(models.UserCreate, {
            foreignKey: {
                allowNull: false
            }
        });
    }

    return Board;
}