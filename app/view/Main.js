Ext.define('Ecommerce.view.Main', {
    extend  : 'Ext.NavigationView',
    requires: [
        'Ecommerce.view.categories.Category'
    ],
    xtype   : 'main-view',
    config  : {
        items        : [
            {
                xtype: 'category-view'
            }
        ],
        navigationBar: {
            itemId: 'navigationBar',
            docked: 'top',
            items : [
                {
                    xtype : 'button',
                    itemId: 'logoutButton',
                    text  : 'Logout',
                    align : 'left'
                },
                {
                    xtype  : 'button',
                    itemId : 'cartButton',
                    iconCls: 'cart',
                    hidden : true
                },
                {
                    xtype : 'label',
                    itemId: 'welcomeLabel',
                    tpl   : '{name}',
                    data  : {},
                    hidden: true
                },
                {
                    xtype : 'label',
                    itemId: 'categoryLabel',
                    tpl   : '{name}',
                    data  : {},
                    hidden: true
                },
                {
                    xtype : 'button',
                    text  : '+',
                    itemId: 'addButton',
                    align : 'right'
                },
                {
                    xtype : 'button',
                    itemId: 'editButton',
                    text  : 'Edit',
                    align : 'right',
                    hidden: true
                },
                {
                    xtype : 'button',
                    itemId: 'addToCartButton',
                    text  : 'Add',
                    align : 'right',
                    hidden: true
                }
            ]
        }
    }
});