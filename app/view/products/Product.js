/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.products.Product', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'product-view',
    config: {
        itemCls: 'item-swipe',
        itemTpl: ''.concat(
            '<div class="name">{name}</div>',
            '<div class="action" data-action="delete" data-id="{product_id}">Delete</div>'
        )
    }
});