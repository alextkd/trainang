/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.store.Users', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],

    config: {
        storeId : 'Users',
        autoLoad: true,
        autoSync: true,
        model   : 'Ecommerce.model.User',
        proxy   : {
            type: 'localstorage',
            id  : 'users'
        }
    }
});