/**
 * Created by andreilakatos on 14/08/15.
 */
var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    userRestHandler     = require('./api/users'),
    categoryRestHandler = require('./api/categories'),
    productRestHandler  = require('./api/products'),
    models              = require('./models');


app.get('/', function (req, res) {
    res.send('Ecommerce rest-api services');
});

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(function (req, res, next) {
    var authToken = req.header('x-auth'),
        Auth      = models.Auth;

    if (req.originalUrl.search('users') < 0 && req.method != 'PUT') {
        Auth.find({
            where: {
                token: authToken
            }
        }).then(function (auth) {
            if (auth) {
                next();
            } else {
                res.status(403).send('Forbidden access, authentification token not found.')
            }
        });
    } else {
        next();
    }
});

app.use('/api', userRestHandler);

app.use('/api', categoryRestHandler);

app.use('/api', productRestHandler);

app.listen(8080);
console.log("Server initialized at localhost:8080/ ");
