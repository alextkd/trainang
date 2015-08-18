/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.model.User', {
    extend: 'Ext.data.Model',
    config: {

        fields     : [
            {
                name: 'id',
                type: 'number'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'email',
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
        ]
    }
});