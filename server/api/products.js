var models           = require('../models'),
    router           = require('express').Router(),
    Category         = models.Category,
    Product          = models.Product,
    Category_Product = models.Category_Product;

router.route('/categories/:categoryId/products')
    .get(function (req, res) {
        var categoryId = req.params.categoryId;

        Category.find({
            where  : {
                category_id: categoryId
            },
            include: [{
                model     : Product,
                required  : true,
                attributes: [
                    'id',
                    'name',
                    'description',
                    'price',
                    'image'
                ]
            }]
        }).then(function (category) {
            var response = {
                success: true,
                data   : category ? category.Products : null
            };

            res.status(200).send(response);
        });
    })
    .post(function (req, res) {
        var data       = req.body,
            categoryId = req.params.categoryId,
            response   = {
                success: false
            };

        Product.create({
            name       : data['name'],
            description: data['description'],
            price      : data['price'],
            image      : data['image']
        }).then(function (product) {

            response.data    = product;
            response.success = true;
            Category_Product.create({
                category_id: categoryId,
                product_id : product.id
            }).then(function (cat_prod) {
                console.log(cat_prod);
            }).catch(function (err) {
                console.log(err);
            });
            res.status(200).json(response);
        });
    });

router.route('/categories/:categoryId/products/:productId')
    .get(function (req, res) {
        var categoryId = req.params.categoryId,
            productId  = req.params.productId,
            response   = {
                success: false
            };

        Product.find({
            where  : {
                id: productId
            },
            include: [
                {
                    model   : Category,
                    required: true,
                    where   : {
                        category_id: categoryId
                    }
                }
            ]
        }).then(function (product) {
            response.data    = product;
            response.success = true;
            res.status(200).json(response);
        });
    })
    .put(function (req, res) {
        var data       = req.body,
            categoryId = req.params.categoryId,
            productId  = req.params.productId,
            response   = {
                success: false
            };

        Product.update(data, {
            where  : {
                id: productId
            },
            include: [
                {
                    model   : Category,
                    required: true,
                    where   : {
                        id: categoryId
                    }
                }
            ]
        }).then(function (product) {
            response.data    = product;
            response.success = true;
            res.status(200).send(response);
        });
    })
    .delete(function (req, res) {
        var productId = req.params.productId,
            response  = {
                success: false
            };

        Product.destroy({
            where: {
                product_id: productId
            }
        }).then(function (result) {
            response.data    = {
                id: productId
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