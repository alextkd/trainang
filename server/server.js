/**
 * Created by andreilakatos on 14/08/15.
 */
var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    userRestHandler     = require('./api/users'),
    categoryRestHandler = require('./api/categories'),
    productRestHandler  = require('./api/products');


app.get('/', function (req, res) {
    res.send('Ecommerce rest-api services');
});

app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/api', userRestHandler);

app.use('/api', categoryRestHandler);

app.use('/api', productRestHandler);

app.listen(8080);
console.log("Server initialized at localhost:8080/ ");
