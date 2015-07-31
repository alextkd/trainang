Ext.define('Ecommerce.view.Category', {
    extend: 'Ext.dataview.List',
    xtype : 'category-view',
    config: {
        xtype           : 'list',
        itemTpl         : '<div id="category{categoryId}"><strong>{name}</strong></div>',
        onItemDisclosure: true
    },

    initialize: function () {
        var me = this;
        me.callParent(arguments);
        me.setStore(Ext.getStore('Categories'));
    }
});