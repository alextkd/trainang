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
        autoLoad: true,
        autoSync: true,
        model   : 'Ecommerce.model.User',
        proxy    : {
            type  : 'rest',
            url   : 'http://localhost:8080/api/users',
            reader: {
                type        : 'json',
                rootProperty: 'data'
            },
            writer: {
                type: 'json'
            }
        }
    }
});