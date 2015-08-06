/**
 * Created by andreilakatos on 5/08/15.
 */
Ext.define('Ecommerce.view.cart.Cart', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'cart',
    config: {
        itemCls: 'item-swipe',
        itemTpl: ''.concat('<div class="listcontainer">',
            '<div class="name">{name}</div>',
            '<div class="action" data-action="delete" data-id="{category_id}">Delete</div>',
            '</div>')
    },

    initialize: function () {
        var me = this;

        me.callParent(arguments);
        me.setStore(Ext.getStore('Cart'));
    }
});