var models = require('../models'),
    router = require('express').Router(),
    User   = models.User;

router.route('/users')
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
            age     : data['age']
        }).then(function (user) {
            response.data    = user;
            response.success = true;
            res.status(200).json(response);
        });
    });

router.route('/users/:userId')
    .get(function (req, res) {
        var userId   = req.params.userId,
            response = {
                success: false
            };

        User.find({
            where: {
                user_id: userId
            }
        }).then(function (user) {
            response.data    = user;
            response.success = true;
            res.status(200).json(response);
        });
    })
    .put(function (req, res) {
        var data     = req.body,
            userId   = req.params.userId,
            response = {
                success: false
            };

        User.update(data, {
            where: {
                id: userId
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

        User.destroy({
            where: {
                id: userId
            }
        }).then(function (result) {
            response.data    = {
                id: userId
            };
            response.success = true;
            res.status(200).json(response);
        }).catch(function (err) {
            if (err) {
                res.status(404).send(err.toString());
            }
        });
    });

module.exports = router;