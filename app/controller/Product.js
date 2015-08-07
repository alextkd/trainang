/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.controller.Product', {
    extend: 'Ext.app.Controller',
    config: {
        views  : [
            'products.AddProduct',
            'products.ProductDetails'
        ],
        refs   : {
            main              : 'main-view',
            productList       : 'product-view',
            productDetailsView: 'productdetailsview',
            addProductView    : 'add-product-view',
            mainView          : 'main-view',
            categoryLabel     : '#categoryLabel'
        },
        control: {
            'product-view'                    : {
                addItem     : 'addItem',
                itemtap     : 'onProductTap',
                activate    : 'onViewActivate',
                deactivate  : 'onViewDeActivate',
                'deleteitem': 'deleteProduct'
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

    onViewActivate: function () {
        var me            = this,
            productList   = me.getProductList(),
            navigationBar = me.getMain().getNavigationBar(),
            categoryStore = Ext.getStore('Categories'),
            categoryId    = productList.getStore().getModelDefaults().category_id,
            categoryLabel = me.getCategoryLabel();

        setTimeout(function () {
            navigationBar.setMasked(false);
        }, 500);
        productList && productList.setMasked(false);
        categoryLabel.updateData(categoryStore.findRecord('category_id', categoryId).getData());
        categoryLabel.show();
    },

    onViewDeActivate: function () {
        var me            = this,
            navigationBar = me.getMain().getNavigationBar(),
            categoryLabel = me.getCategoryLabel();

        navigationBar.setMasked({
            xtype      : 'loadmask',
            transparent: true
        });
        categoryLabel.hide();
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

        products.add(product);
        productModalView.destroy();
    },

    deleteProduct: function (productId) {
        Ext.Msg.confirm('Delete', 'Are you sure you want to delete this product',
            function (btn) {
                if (btn == 'yes') {
                    var store = Ext.getStore('Productsstore'),
                        index = store.findBy(function (record, id) {
                            if (productId == id) {
                                return true;
                            }
                        });

                    store.removeAt(index);
                }
            });

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