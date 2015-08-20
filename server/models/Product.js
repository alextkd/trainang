/*
 * Product model
 * */


var Product = function (sequelize, DataTypes) {
    return sequelize.define("Product", {
        id         : {
            field        : 'product_id',
            type         : DataTypes.INTEGER,
            primaryKey   : true,
            autoIncrement: true
        },
        name       : DataTypes.STRING,
        description: DataTypes.STRING,
        price      : DataTypes.INTEGER,
        image      : DataTypes.STRING
    });
};

module.exports = Product;