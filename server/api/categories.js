var models   = require('../models'),
    router   = require('express').Router(),
    Category = models.Category;

router.route('/categories')
    .get(function (req, res, next) {
        Category.findAll().then(function (categories) {
            var response = {
                success: true,
                data   : categories
            };
            res.status(200).send(response);
        });
    })
    .post(function (req, res, next) {
        var data     = req.body,
            response = {
                success: false
            };

        Category.create({
            name: data['name']
        }).then(function (category) {
            response.data    = category;
            response.success = true;
            res.status(200).json(response);
        });
    });

router.route('/categories/:categoryId')
    .get(function (req, res, next) {
        var categoryId = req.params.categoryId,
            response   = {
                success: false
            };

        Category.find({
            where: {
                category_id: categoryId
            }
        }).then(function (category) {
            response.data    = category;
            response.success = true;
            res.status(200).json(response);
        });
    })
    .put(function (req, res, next) {
        var data       = req.body,
            categoryId = req.params.categoryId,
            response   = {
                success: false
            };

        Category.update(data, {
            where: {
                id: categoryId
            }
        }).then(function (category) {
            response.data    = category;
            response.success = true;
            res.status(200).send(response);
        });
    })
    .delete(function (req, res, next) {
        var categoryId = req.params.categoryId,
            response   = {
                success: false
            };

        Category.destroy({
            where: {
                id: categoryId
            }
        }).then(function (result) {
            response.data    = {
                id: categoryId
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