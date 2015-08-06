Ext.define('Ecommerce.view.cart.CartNavigation', {
    extend  : 'Ext.NavigationView',
    requires: [
        'Ecommerce.view.cart.Cart'
    ],
    xtype   : 'cart-navigation-view',
    config  : {
        width         : '100%',
        height        : '100%',
        items         : [
            {
                xtype: 'cart'
            }
        ],
        showAnimation: {
            type     : 'slide',
            direction: 'up'
        },
        hideAnimation: {
            type     : 'slideOut',
            direction: 'down'
        },
        navigationBar : {
            itemId: 'navigationBar',
            docked: 'top',
            items : [
                {
                    xtype  : 'button',
                    itemId : 'exitButton',
                    iconCls: 'delete',
                    cls    : 'testare',
                    align  : 'left'
                },
                {
                    xtype : 'button',
                    itemId: 'clearButton',
                    text  : 'Clear',
                    align : 'right'
                },
                {
                    xtype : 'button',
                    itemId: 'checkoutButton',
                    text  : 'Checkout',
                    align : 'right'
                },
                {
                    xtype : 'button',
                    itemId: 'payButton',
                    text  : 'Pay',
                    align : 'right',
                    hidden: true
                }
            ]
        },
        modal         : true,
        centered      : true,
        hidden        : true
    }
});