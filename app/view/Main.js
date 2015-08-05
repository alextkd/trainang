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
            height: 40,
            items : [
                {
                    xtype : 'button',
                    itemId: 'logoutButton',
                    text  : 'Logout',
                    align : 'left'
                },
                {
                    xtype : 'label',
                    itemId: 'welcome-label',
                    tpl   : '{name}',
                    data  : {}
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
                }
            ]
        }
    }
});