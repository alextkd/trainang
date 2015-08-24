/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.store.Categories', {
    extend  : 'Ext.data.Store',
    requires: [
        'Ecommerce.model.Category'
    ],

    config: {
        storeId : 'Categories',
        autoSync: true,
        model   : 'Ecommerce.model.Category'
    }
});