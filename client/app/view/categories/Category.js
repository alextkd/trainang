Ext.define('Ecommerce.view.categories.Category', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'category-view',
    config: {
        itemCls: 'item-swipe',
        itemTpl: ''.concat(
            '<div class="name">{name}</div>',
            '<div class="action">',
            '<div class="edit"  data-action="edititem" data-id="{category_id}">Edit</div>',
            '<div class="delete"  data-action="deleteitem" data-id="{id}">Delete</div>',
            '</div>'
        )
    },

    initialize: function () {
        var me            = this,
            categoryStore = Ext.getStore('Categories');

        categoryStore.load();
        me.callParent(arguments);
        me.setStore(categoryStore);
    }
});