/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.Product', {
    extend: 'Ext.dataview.List',
    xtype : 'product-view',
    config: {
        itemId          : 'product-list',
        itemTpl         : '<div><strong>{name}</strong></div>',
        store           : {
            model  : 'Ecommerce.model.Product',
            storeId: 'productsStore',
            data   : []
        },
        onItemDisclosure: true
    }
});