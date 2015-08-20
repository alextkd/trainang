/**
 * Service that is responsible for handling errors.
 */
Ext.define('Ecommerce.services.Error', {

    /**
     * Logs errors thrown in the application.
     * Although it currently only supports logging to the console,
     * we'll eventually need to log to a remote logging service.
     *
     * @param {Object} errorConfig
     */
    logError : function(errorConfig) {
        // <debug error>
        console.error('ERROR:', errorConfig);
        // </debug>
    }
});