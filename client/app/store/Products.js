/**
 * Created by andreilakatos on 24/08/15.
 */
Ext.define('Ecommerce.store.Products', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ecommerce.model.Product'
    ],

    config: {
        storeId : 'Products',
        autoSync: true,
        model   : 'Ecommerce.model.Product'
    }
});