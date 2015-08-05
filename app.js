Ext.application({
    name       : 'Ecommerce',
    statics    : {
        localStorageAppId: '-Ecommerce'
    },
    controllers: [
        'Main',
        'Login',
        'Category',
        'Product',
        'ProductDetails',
        'Cart'
    ],
    stores     : [
        'Categories',
        'Products',
        'Users',
        'UsersStored',
        'Cart'
    ],

    launch: function () {
        Ext.fly('appLoadingIndicator').destroy();
    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});