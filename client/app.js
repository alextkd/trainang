Ext.application({
    name       : 'Ecommerce',
    requires   : [
        'Ecommerce.mixin.Serviceable',
        'Ecommerce.services.Account',
        'Ecommerce.services.Error'
    ],
    statics    : {
        localStorageAppId: '-Ecommerce'
    },
    controllers: [
        'Main',
        'Category',
        'Product',
        'ProductDetails',
        'Cart',
        'Profile'
    ],
    stores     : [
        'Categories',
        'Products',
        'Users',
        'UsersStored',
        'Cart'
    ],

    launch: function () {
        //debugger;
        Ext.fly('appLoadingIndicator').destroy();
    },

    getService: function (servicePath) {
        return this.services[servicePath];
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