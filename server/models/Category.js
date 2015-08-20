/*
 * Category model
 * */

var Category = function (sequelize, DataTypes) {
    return sequelize.define("Category", {
        id  : {
            field        : 'category_id',
            type         : DataTypes.INTEGER,
            primaryKey   : true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });
};

module.exports = Category;