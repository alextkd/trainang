Ext.define('Ecommerce.services.Products', {
    requires: [
        'Ext.Ajax'
    ],

    loadProducts: function (config) {
        var me  = this,
            url = 'http://localhost:8080/api/categories/categoryId/products';

        url = url.replace('categoryId', config.categoryId);
        Ext.Ajax.request({
            url     : url,
            method  : 'GET',
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me
        });
    },

    removeProduct: function (config) {
        var me  = this,
            url = 'http://localhost:8080/api/categories/categoryId/products/productId';

        url = url.replace('categoryId', config.categoryId);
        url = url.replace('productId', config.productId);
        Ext.Ajax.request({
            url     : url,
            method  : 'DELETE',
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me
        });
    },

    addProduct: function (config) {
        var me  = this,
            url = 'http://localhost:8080/api/categories/categoryId/products';

        url = url.replace('categoryId', config.categoryId);
        Ext.Ajax.request({
            url     : url,
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me,
            jsonData: Ext.encode(config.data)

        });
    },

    editProduct: function (config) {
        var me  = this,
            url = 'http://localhost:8080/api/categories/categoryId/products/productId';

        url = url.replace('categoryId', config.categoryId);
        url = url.replace('productId', config.productId);
        Ext.Ajax.request({
            url     : url,
            method  : 'PUT',
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me,
            jsonData: Ext.encode(config.data)
        });
    }
});