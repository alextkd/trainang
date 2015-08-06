/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.model.User', {
    extend: 'Ext.data.Model',
    config: {
        identifier : {
            type: 'uuid'
        },
        fields     : [
            {
                name: 'id',
                type: 'string'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'username',
                type: 'string'
            },
            {
                name: 'password',
                type: 'string'
            },
            {
                name        : 'age',
                type        : 'number',
                defaultValue: 18
            }
        ],
        validations: [
            {
                field  : 'name',
                type   : 'presence',
                message: 'Name is required.'
            },
            {
                field  : 'username',
                type   : 'presence',
                message: 'Username is required.'
            },
            {
                field  : 'password',
                type   : 'presence',
                message: 'Password is required.'
            },
            {
                field  : 'age',
                type   : 'presence',
                message: 'Age is required.'
            }
        ],
    }
});