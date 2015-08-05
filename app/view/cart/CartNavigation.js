Ext.define('Ecommerce.view.cart.CartNavigation', {
    extend  : 'Ext.NavigationView',
    requires: [
        'Ecommerce.view.cart.Cart'
    ],
    xtype   : 'cart-navigation-view',
    config  : {
        width        : '80%',
        height       : '50%',
        items        : [
            {
                xtype: 'cart'
            }
        ],
        navigationBar: {
            itemId: 'navigationBar',
            docked: 'top',
            height: 40,
            items : [
                {
                    xtype : 'button',
                    itemId: 'exitButton',
                    iconCls: 'delete',
                    cls   : 'testare',
                    align : 'left'
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
                }
            ]
        },
        modal        : true,
        centered     : true
    }
});