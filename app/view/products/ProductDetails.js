/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.products.ProductDetails', {
    extend: 'Ext.Component',
    xtype : "productdetailsview",
    config: {
        cls       : 'product-details',
        layout    : 'vbox',
        data      : {},
        tpl       : ''.concat(
            '<div class="product-container">',
                '<div class="image">',
                    '<img width="100%" src="{image}" alt="{name}"/>',
                '</div>',
                '<div class="infos">',
                    '<div class="description">{description}</div>',
                    '<div class="price">{price}$</div>',
                '</div>',
            '</div>'
        )
    }
});