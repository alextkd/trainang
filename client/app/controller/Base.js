Ext.define('Ecommerce.controller.Base', {
    extend : 'Ext.app.Controller',

    mixins : [
        'Ecommerce.mixin.Serviceable'
    ],

    /**
     * shows a loading indicator on the viewport
     */
    mask : function() {
        Ext.Viewport.mask({
            xtype  : 'loadmask',
            zIndex : 2147483647
        });
    },

    /**
     * removes the loading indicator from the viewport
     */
    unmask : function() {
        Ext.Viewport.unmask();
    }
});