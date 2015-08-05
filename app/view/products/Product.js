/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.products.Product', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'product-view',
    config: {
        itemCls: 'item-swipe',
        itemTpl: ''.concat('<div class="listcontainer">',
            '<div class="name"><span style="position: absolute; left: 10px; top: 10px">{name}</span></div>',
            '<div class="action" data-action="delete" data-id="{product_id}">Delete</div>',
            '</div>')
    }
});