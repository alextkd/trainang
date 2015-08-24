Ext.application({
    name       : 'Ecommerce',
    requires   : [
        'Ext.Ajax',
        'Ecommerce.mixin.Serviceable',
        'Ecommerce.services.Account',
        'Ecommerce.services.Error',
        'Ecommerce.services.Products',
        'Ecommerce.component.Rest'
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
        'Users',
        'UsersStored',
        'Cart',
        'Products'
    ],

    launch: function () {
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