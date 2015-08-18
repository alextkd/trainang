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
        autoLoad: true,
        autoSync: true,
        model   : 'Ecommerce.model.Category',
        proxy   : {
            type: 'localstorage',
            id  : 'categories'
        }
    }
});