/**
 * Created by andreilakatos on 5/08/15.
 */
Ext.define('Ecommerce.view.cart.Checkout', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'checkout',
    config: {
        itemCls : 'item-swipe',
        itemTpl : ''.concat('<div class="listcontainer">',
            '<div class="name">{name} <span class="price"><b>{price}$</b></span></div>',
            '</div>')
    },

    initialize: function () {
        var me = this;

        me.callParent(arguments);
        me.setStore(Ext.getStore('Cart'));
    }
});