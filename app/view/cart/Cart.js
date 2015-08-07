/**
 * Created by andreilakatos on 5/08/15.
 */
Ext.define('Ecommerce.view.cart.Cart', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'cart',
    config: {
        itemCls: 'item-swipe',
        itemTpl: ''.concat(
            '<div class="name">{name} <span class="price"><b>{price}$</b></span></div>',
            '<div class="action">',
                '<div style="width: 100%;" class="delete" data-action="deleteitem" data-id="{product_id}">Delete</div>',
            '</div>')
    },

    initialize: function () {
        var me = this;

        me.callParent(arguments);
        me.setStore(Ext.getStore('Cart'));
    }
});