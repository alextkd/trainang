/*
 * Category model
 * */

var Auth = function (sequelize, DataTypes) {
    return sequelize.define("Auth", {
        auth_id: {
            field        : 'auth_id',
            type         : DataTypes.INTEGER,
            primaryKey   : true,
            autoIncrement: true
        },
        user_id: DataTypes.INTEGER,
        token  : DataTypes.STRING
    });
};

module.exports = Auth;