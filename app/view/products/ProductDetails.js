/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.products.ProductDetails', {
    extend: 'Ext.Component',
    xtype : "productdetailsview",
    config: {
        tpl:''.concat('<div>',
        '<img src="{image}" width="100%" alt="{name}" />',
         '</div>')
    }
});