Ext.define('Ecommerce.mixin.Serviceable', {

    /**
     * Returns a service instance from the application's service cache
     * based on a dot-notation path. For instance, we could pass in 'native.connection'
     * to get the connection service instance.
     *
     * @param {String} servicePath
     * @returns {Object} A service instance
     */
    getService : function(servicePath) {
        return this.getApplication().getService(servicePath);
    }
});