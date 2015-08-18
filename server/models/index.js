var ConfigDb  = require('../config').database,
    Sequelize = require('sequelize'),
    sequelize = new Sequelize(
        ConfigDb.name,
        ConfigDb.username,
        ConfigDb.password
    ),
    models    = [
        'User'
    ];

models.forEach(function (model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
    module.exports[model].sync();
});

module.exports.sequelize = sequelize;