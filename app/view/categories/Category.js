Ext.define('Ecommerce.view.categories.Category', {
    extend    : 'Ecommerce.component.CustomList',
    xtype     : 'category-view',
    config    : {
        itemCls: 'item-swipe',
        itemTpl: ''.concat(
            '<div class="name">{name}</div>',
            '<div class="action" data-action="delete" data-id="{category_id}">Delete</div>'
        )
    },
    initialize: function () {
        var me = this;

        me.callParent(arguments);
        me.setStore(Ext.getStore('Categories'));
    }
});