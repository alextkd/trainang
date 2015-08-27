var ConfigDb  = require('../config').database,
    Sequelize = require('sequelize'),
    sequelize = new Sequelize(
        ConfigDb.name,
        ConfigDb.username,
        ConfigDb.password
    ),
    models    = [
        'User',
        'Product',
        'Category',
        'Category_Product',
        'Auth'
    ];


models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports['Product'].belongsToMany(module.exports['Category'], {
    through   : module.exports['Category_Product'],
    foreignKey: 'product_id'
});

module.exports['Category'].belongsToMany(module.exports['Product'], {
    through   : module.exports['Category_Product'],
    foreignKey: 'category_id'
});

models.forEach(function (model) {
    module.exports[model].sync();
});

module.exports.sequelize = sequelize;