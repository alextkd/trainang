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
			clearButton   : '#clearButton',
			checkoutButton: '#checkoutButton',
            cartButton    : '#cartButton',
			payButton     : '#payButton'
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
			'checkout'                            : {
				activate  : 'onViewActivate',
				deactivate: 'onViewDeactivate'
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
        var me = this,
			cartNavigation = me.getCartNavigation();
			
		cartNavigation.push({
			xtype: 'checkout'
		});
    },
	
	onViewActivate: function() {
		var me             = this,
			checkoutButton = me.getCheckoutButton(),
			clearButton    = me.getClearButton(),
			payButton      = me.getPayButton();
		
	    checkoutButton.hide();
		clearButton.hide();
		payButton.show();
	},
	
	onViewDeactivate: function() {
	    var me             = this,
			checkoutButton = me.getCheckoutButton(),
			clearButton    = me.getClearButton(),
			payButton      = me.getPayButton();
		
	    checkoutButton.show();
		clearButton.show();
		payButton.hide();
	}
});