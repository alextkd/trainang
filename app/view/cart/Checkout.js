/**
 * Created by andreilakatos on 5/08/15.
 */
Ext.define('Ecommerce.view.cart.Checkout', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'checkout',
    config: {
        itemCls : 'item-swipe',
        itemTpl : ''.concat('<div class="listcontainer">',
            '<div class="name">{name} <p style="float: right">{price}$</p></div>',
            '<div class="action" data-action="delete" data-id="{category_id}">Delete</div>',
            '</div>')
    },

    initialize: function () {
        var me = this;

        me.callParent(arguments);
        me.setStore(Ext.getStore('Cart'));
    }
});