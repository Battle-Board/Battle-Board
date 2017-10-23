module.exports = function(sequelize, Sequelize) {
    const User = sequelize.define("user", {
        // email: { // Email could be required or not needed depending on requirements
        //     type: Sequelize.STRING,
        //     allowNull: false,
        //     validate: {
        //         isEmail: true,
        //         notEmpty: true
        //     }
        // },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    });
    return User;
}