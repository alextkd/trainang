Ext.define('Ecommerce.controller.Cart', {
    extend: 'Ext.app.Controller',
    config: {
        models : [
            'User'
        ],
        stores : [
            'Users',
            'UsersStored'
        ],
        views  : [
            'cart.CartNavigation',
            'cart.Checkout'
        ],
        refs   : {
            cartNavigation: 'cart-navigation-view',
            checkoutView  : 'checkot-view',
            clearButton   : '#clearButton',
            checkoutButton: '#checkoutButton',
            cartButton    : '#cartButton',
            payButton     : '#payButton',
            priceLabel    : '#priceLabel'
        },
        control: {
            'cart-navigation-view #exitButton'    : {
                tap: 'onExitButton'
            },
            'cart-navigation-view #clearButton'   : {
                tap: 'onClearButton'
            },
            'cart-navigation-view #checkoutButton': {
                tap: 'onCheckoutButton'
            },
            'cart-navigation-view #payButton'     : {
                tap: 'onPayButton'
            },
            'checkout'                            : {
                activate  : 'onViewActivate',
                deactivate: 'onViewDeactivate'
            },
            'cart'                                : {
                'deleteitem': 'deleteProduct'
            }
        }
    },

    onExitButton: function () {
        var cartNavigationView = this.getCartNavigation();
        cartNavigationView.hide();
        Ext.defer(function () {
            cartNavigationView && cartNavigationView.destroy();
        }, 600);
    },

    onClearButton: function () {
        var me = this,
            cartStore,
            cartNavigationView,
            cartButton;

        Ext.Msg.confirm('Delete', 'Are you sure you want to clear the store',
            function (btn) {
                if (btn == 'yes') {
                    cartButton         = me.getCartButton();
                    cartStore          = Ext.getStore('Cart');
                    cartNavigationView = me.getCartNavigation();

                    cartStore.clearData();
                    cartNavigationView && cartNavigationView.destroy();
                    cartButton.hide();
                }
            });
    },

    onCheckoutButton: function () {
        var me             = this,
            cartNavigation = me.getCartNavigation();

        cartNavigation.push({
            xtype: 'checkout'
        });
    },

    calculateTotal: function () {
        var cartStore  = Ext.getStore('Cart'),
            totalPrice = 0,
            data;

        cartStore.each(function (item) {
            data = item.getData();

            totalPrice += data.price;
        });
        return totalPrice;
    },

    onViewActivate: function () {
        var me             = this,
            checkoutButton = me.getCheckoutButton(),
            clearButton    = me.getClearButton(),
            payButton      = me.getPayButton(),
            priceLabel     = me.getPriceLabel();

        priceLabel.setHtml(''.concat(
            '<b>Total price: ',
            me.calculateTotal(),
            '$</b>'
        ));
        priceLabel.show();
        checkoutButton.hide();
        clearButton.hide();
        payButton.show();
    },

    onViewDeactivate: function () {
        var me             = this,
            checkoutButton = me.getCheckoutButton(),
            clearButton    = me.getClearButton(),
            payButton      = me.getPayButton(),
            priceLabel     = me.getPriceLabel();

        priceLabel.hide();
        checkoutButton.show();
        clearButton.show();
        payButton.hide();
    },

    onPayButton: function () {
        var me             = this,
            cartStore      = Ext.getStore('Cart'),
            cartNavigation = me.getCartNavigation(),
            cartButton     = me.getCartButton();

        cartStore.clearData();
        cartNavigation.hide();
        Ext.defer(function () {
            cartNavigation && cartNavigation.destroy();
        }, 600);
        cartButton.hide();
        Ext.Msg.alert('Succes', 'Payment complete.');
    },

    deleteProduct: function (productId) {
        var me = this,
            store,
            index;

        Ext.Msg.confirm('Delete', 'Are you sure you want to delete this category',
            function (btn) {
                if (btn == 'yes') {
                    store = Ext.getStore('Cart');
                    index = store.findBy(function (record, id) {
                        if (productId == id) {
                            return true;
                        }
                    });
                    store.removeAt(index);
                    if (store.getCount() == 0) {
                        me.getCartButton().hide();
                    }
                }
            });
    }
});