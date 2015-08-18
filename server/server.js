/**
 * Created by andreilakatos on 14/08/15.
 */
var express    = require('express'),
    config     = require('./config'),
    app        = require('express')(),
    bodyParser = require('body-parser'),
    models     = require('./models'),
    sequelize  = models.sequelize,
    User       = models.User;


app.get('/', function (req, res) {
    res.send('Ecommerce rest-api services');
});

app.set('models', require('./models'));

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.route('/api/users')
    .get(function (req, res) {
        User.findAll().then(function (users) {
            var response = {
                success: true,
                data   : users
            };
            res.status(200).send(response);
        });
    })
    .post(function (req, res) {
        var data     = req.body,
            response = {
                success: false
            };

        User.create({
            name    : data['name'],
            email   : data['email'],
            password: data['password'],
            age     : 20
        }).then(function (user) {
            response.data    = user;
            response.success = true;
            res.status(200).json(response);
        });
    });

app.route('/api/users/:userId')
    .get(function (req, res) {
        var response = {
            success: false
        };

        User.findById(req.params.userId).then(function (user) {
            response.data    = user;
            response.success = user ? true : false;
            res.status(user ? 200 : 404).json(response);
        });
    })
    .put(function (req, res) {
        var data     = req.body,
            response = {
                success: false
            };

        User.update(data, {
            where: {
                userId: req.params.userId
            }
        }).then(function (user) {
            response.data    = user;
            response.success = true;
            res.status(200).send(response);
        });
    })
    .delete(function (req, res) {
        var userId   = req.params.userId,
            response = {
                success: false
            };

        console.log(req.params.userId);

        User.destroy({
            where: {
                id: userId
            }
        }).then(function (result) {
            response.data    = result;
            response.success = true;
            res.status(200).json(response);
        }).catch(function (err) {
            if (err) {
                res.status(404).send(err.toString());
            }
        });

    });

app.listen(8080);
console.log("Server initialized at localhost:8080/ ");
