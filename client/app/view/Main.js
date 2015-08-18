Ext.define('Ecommerce.view.Main', {
    extend  : 'Ecommerce.component.SlideNavigationView',
    requires: [
        'Ecommerce.view.ProductsNavigation',
        'Ecommerce.view.user.Profile'
    ],
    xtype   : 'main-view',
    config  : {
        fullscreen         : true,
        slideSelector       : 'x-toolbar',
        containerSlideDelay: 10,
        selectSlideDuration: 200,
        itemMask           : true,
        slideButtonDefaults: {
            name : "Menu",
            title: "Menu"
        },
        items              : [
            {
                xtype      : 'products-navigation-view',
                title      : 'Category',
                slideButton: true
            },
            {
                xtype      : 'profile-view',
                title      : 'Profile',
                slideButton: true
            }
        ]
    }
});

