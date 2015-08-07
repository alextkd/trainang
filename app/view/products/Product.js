/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.products.Product', {
    extend: 'Ecommerce.component.CustomList',
    xtype : 'product-view',
    config: {
        itemCls: 'item-swipe',
        itemTpl: ''.concat(
            '<div class="name"><span>{name}</span> <span class="price"><b>{price}$</b></span></div>',
            '<div class="action">',
                '<div style="width: 100%;" class="delete" data-action="deleteitem" data-id="{product_id}">Delete</div>',
            '</div>'
        )
    }
});