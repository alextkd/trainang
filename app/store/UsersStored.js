/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.store.UsersStored', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage',
        'Ecommerce.model.User'
    ],

    config: {
        storeId : 'UsersStored',
        autoSync: true,
        //autLoad : true,
        model   : 'Ecommerce.model.User',
        proxy   : {
            type: 'localstorage',
            id  : 'logged-user'
        }
    }
});