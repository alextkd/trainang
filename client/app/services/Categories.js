Ext.define('Ecommerce.services.Categories', {
    requires: [
        'Ext.Ajax'
    ],

    loadProducts: function (config) {
        var me  = this,
            url = 'http://localhost:8080/api/categories';

        url = url.replace('categoryId', config.categoryId);
        Ext.Ajax.request({
            url     : url,
            method  : 'GET',
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me
        });
    }
});