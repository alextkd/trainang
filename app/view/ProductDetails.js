/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.view.ProductDetails', {
    extend: 'Ext.Component',
    xtype : "productdetailsview",
    config: {
        tpl:''.concat('<div>',
        '<div> Name: {name}</div>',
        '<div> Description: {description}</div>',
        '<div> Price: {price}</div>',
        '<img src="{image}" width="100%" alt="{name}" />',
         '</div>')
    }
});