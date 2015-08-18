/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.store.Cart', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ecommerce.model.Product'
    ],

    config: {
        storeId : 'Cart',
        autoLoad: true,
        autoSync: true,
        model   : 'Ecommerce.model.Product',
        proxy   : {
            type: 'localstorage',
            id  : 'products-cart'
        }
    }
});