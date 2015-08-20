Ext.define('Ecommerce.services.Account', {

    login: function (config) {
        var me = this;

        Ext.Ajax.request({
            url     : 'http://localhost:8080/api/login',
            method  : 'POST',
            data    : {
                email   : config.email,
                password: config.password
            },
            params  : {
                method: 'post'
            },
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me
        });
    },

    register: function (config) {
        var me = this;

        Ext.Ajax.request({
            url     : 'http://localhost:8080/api/register',
            method  : 'POST',
            data    : config.userObject,
            params  : {
                method: 'post'
            },
            callback: config.callback || Ext.emptyFn,
            scope   : config.scope || me
        });
    }
});