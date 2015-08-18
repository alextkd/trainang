/*
 * User's model
 * */


var User = function (sequelize, DataTypes) {
    return sequelize.define("User", {
        id : {
            field        : 'user_id',
            type         : DataTypes.INTEGER,
            primaryKey   : true,
            autoIncrement: true
        },
        name    : DataTypes.STRING,
        email   : DataTypes.STRING,
        password: DataTypes.STRING,
        age     : DataTypes.INTEGER
    });
};

module.exports = User;