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
            'cart.CartNavigation'
        ],
        refs   : {
            cartNavigation: 'cart-navigation-view',
            cartButton    : '#cartButton'
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
            }
        }
    },

    onExitButton: function () {
        var cartNavigationView = this.getCartNavigation();

        cartNavigationView && cartNavigationView.destroy();
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
        console.log('Checkout');
    }
});