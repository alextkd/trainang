/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.store.Products', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ecommerce.model.Product'
    ],

    config: {
        storeId : 'Products',
        autoLoad: true,
        autoSync: true,
        model   : 'Ecommerce.model.Product',
        proxy   : {
            type: 'localstorage',
            id  : 'products'
        }
    }
});