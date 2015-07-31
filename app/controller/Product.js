/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.controller.Product', {
    extend: 'Ext.app.Controller',
    config: {
        views  : [
            'products.AddProduct',
            'ProductDetails'
        ],
        refs   : {
            main              : 'main-view',
            productList       : 'product-view',
            productDetailsView: 'productdetailsview',
            addProductView    : 'add-product-view',
            mainView          : 'main-view'
        },
        control: {
            'product-view'                    : {
                addItem   : 'addItem',
                itemtap   : 'onProductTap',
                activate  : 'onViewActivate',
                deactivate: 'onViewDeActivate',
                itemswipe : 'onProductSwipe',
                disclose  : 'onProductDisclosure'
            },
            'productview #addNewProductButton': {
                tap: 'onAddNewProductTap'
            },
            'add-product-view #cancelButton'  : {
                tap: 'hideAddProductView'
            },
            'add-product-view #submitButton'  : {
                tap: 'addProduct'
            }
        }
    },

    hideDisclosure: function () {
        var productList = this.getProductList(),
            products    = productList.getStore();

        products.each(function (item) {
            item.set('disclosure', false);
        });
    },

    onViewActivate: function () {
        var productList   = this.getProductList(),
            navigationBar = this.getMain().getNavigationBar();

        navigationBar.setMasked(false);
        productList && productList.setMasked(false);
        this.hideDisclosure();
    },

    onViewDeActivate: function () {
        var navigationBar = this.getMain().getNavigationBar();

        navigationBar.setMasked(true);
        this.hideDisclosure();
    },

    addItem: function () {
        Ext.Viewport.add({
            xtype: 'add-product-view'
        });
    },

    onProductTap: function (el, index) {
        var navigatorView = this.getMain(),
            productList   = this.getProductList(),
            products      = productList.getStore(),
            product       = products.getAt(index),
            navbar,
            navbuttons;

        products.each(function (item) {
            item.set('disclosure', false);
        });

        productList && productList.setMasked(true);

        navigatorView && navigatorView.push({
            xtype : 'productdetailsview',
            record: product
        });

        navbar     = navigatorView.getNavigationBar();
        navbuttons = navbar.getInnerAt(2);

        navbuttons.getComponent('addButton').hide();
        navbuttons.getComponent('editButton').show();
    },

    onProductSwipe: function (el, index, target, record) {
        record.set('disclosure', true);
    },

    onProductDisclosure: function (el, record, target, index, e) {
        var store = this.getProductList().getStore();

        store.remove(record);
        e.stopEvent();
    },

    addItem: function () {
        Ext.Viewport.add({
            xtype: 'add-product-view'
        });
    },

    hideAddProductView: function () {
        var addProductView = this.getAddProductView();
        addProductView && addProductView.destroy();
    },

    addProduct: function () {
        var productModalView = this.getAddProductView(),
            product          = productModalView.getValues(),
            productList      = this.getProductList(),
            products         = productList.getStore();

        if (this.validateProduct(product) == false) {
            return;
        }

        product.disclosure = false;
        products.add(product);
        productModalView.destroy();
    },

    validateProduct: function (values) {
        var model   = Ext.create("Ecommerce.model.Product", values),
            errors  = model.validate(),
            isValid = errors.isValid(),
            message = '',
            title,
            s;

        if (!isValid) {
            title = 'Cannot submit';
            errors.each(function (errorObj) {
                message += errorObj.getMessage() + "<br>";

                s = Ext.String.format('field[name={0}]', errorObj.getField());
            });
        } else {
            title   = 'Success';
            message = 'Product added.'
        }
        Ext.Msg.alert(title, message);
        return isValid;
    }
});