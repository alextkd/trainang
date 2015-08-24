/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.store.Users', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ecommerce.model.User',
        'Ext.data.proxy.Rest'
    ],

    config: {
        storeId : 'Users',
        autoSync: true,
        model   : 'Ecommerce.model.User'
    }
});