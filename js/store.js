var Store = function () {

    var categories  = [],
        catProducts = {};

    var getData = function (callback) {
        $.getJSON("data/data.json").then(function (a) {
            categories = a.categories;
            callback.call(this);
        });
    };


    var getProducts = function (categoryId) {
        var i,
            products = catProducts[categoryId],
            div      = "",
            product;

        for (i = 0; i < products.length; i++) {
            product = products[i];
            div += '<div class="product" style="margin: 20px; width: 100px;' +
                'height: 30px; border: 10px solid blue;" data-productId=' + product.productId +
                ' >' + product.name + '</div>';
        }
        $('.products').html(div);
        $('.products').css({display: 'block'}).animate({marginLeft: '0px', opacity: '1'}, 500);
        $('.back').show();
    };

    this.loadCategories = function () {
        this.categoriesLoaded = true;
        var display           = function () {
            var div = "",
                category,
                i;

            for (i = 0; i < categories.length; i++) {
                category                         = categories[i];
                catProducts[category.categoryId] = category.products;
                div += '<div class="category" style="margin: 20px; width: 100px;' +
                    'height: 30px; border: 10px solid blue;" data-categoryId=' +
                    category.categoryId + ' >' + category.name + '</div>';

            }
            $('.categories').html(div);
            $('.category').on('click', function (evt) {
                var element    = evt.target,
                    categoryId = element.getAttribute('data-categoryId');
                if (categoryId) {
                    $('.categories').hide();
                    getProducts(categoryId);
                }

            });
            $('.category').on('mouseover', function (evt) {
                var element = evt.target;

                element.style.backgroundColor = "green";
            });
            $('.category').on('mouseout', function (evt) {
                var element = evt.target;

                element.style.backgroundColor = "white";
            });
            $('.back').on('click', function (evt) {
                    var element = evt.target;

                    $('.back').hide();
                    $('.categories').show();
                    $('.products').hide();
                    $('.products').css({display: 'block', marginLeft: '-15px', opacity: '0'});
                }
            );
        };
        if (categories.length > 0) {
            display();
        } else {
            getData(display);
        }

    };

    this.displayCategories = function () {
        if (this.categoriesLoaded) {
            $('.categories').show();
        } else {
            this.loadCategories();
        }
    };


    this.displayProducts = function (categoryId) {
        var products = catProducts[categoryId];
        console.log(products);


    };
};


