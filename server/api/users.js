var models = require('../models'),
    router = require('express').Router(),
    crypto = require('crypto'),
    md5    = require('md5'),
    bcrypt = require('bcryptjs'),
    User   = models.User,
    Auth   = models.Auth;

router.route('/users')
    .get(function (req, res) {
        User.findAll().then(function (users) {
            var response = {
                success: true,
                data   : users
            };
            res.status(200).send(response);
        });
    });

router.route('/users/register')
    .post(function (req, res) {
        var data     = req.body,
            response = {
                success: false
            };

        User.create({
            name    : data['name'],
            email   : data['email'],
            password: bcrypt.hashSync(data['password'], 10),
            age     : data['age']
        }).then(function (user) {
            response.data    = user;
            response.success = true;
            res.status(200).json(response);
        });
    });

router.route('/users/login')
    .post(function (req, res) {
        var data     = req.body,
            response = {
                success: false
            },
            authToken,
            rawUser;

        User.find({
            where: {
                email: data['email']
            }
        }).then(function (user) {
            if (bcrypt.compareSync(data.password, user.password)) {
                authToken     = md5(user['email'].concat(':', user['password']));
                delete user.password;
                response.data = user;
                Auth.create({
                    user_id: user['id'],
                    token  : authToken
                }).then(function (auth) {
                    rawUser = user.dataValues;

                    delete rawUser.password;
                    delete rawUser.createdAt;
                    delete rawUser.updatedAt;

                    response.data    = rawUser;
                    response.token   = auth.token;
                    response.success = true;
                    res.status(200).json(response);
                });
            } else {
                res.status(404).send('Password is incorect.');
            }
        }).catch(function () {
            res.status(404).send('Email not found.');
        });
    });

router.route('/users/logout')
    .delete(function (req, res) {
        var data     = req.body,
            response = {
                success: false
            };

        Auth.destroy({
            where: {
                user_id: data['userId']
            }
        }).then(function (user) {
            if (user) {
                res.status(200).send('Logged out');
            } else {
                res.status(404).send('User ID not found.');
            }
        }).catch(function () {
            res.status(404).send('User ID not found.');
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