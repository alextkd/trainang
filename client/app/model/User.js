/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.model.User', {
    extend: 'Ext.data.Model',
    config: {
        identifier : {
            type: 'uuid'
        },
        idProperty : 'id',
        fields     : [
            {
                name: 'id',
                type: 'auto'
            },
            {
                name: 'user_id',
                type: 'int'
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
                field  : 'email',
                type   : 'presence',
                message: 'Email is required.'
            },
            {
                field  : 'age',
                type   : 'presence',
                message: 'Age is required.'
            }
        ],
        proxy      : {
            type              : 'rest',
            url               : 'http://localhost:8080/api/users',
            noCache           : false,
            limitParam        : false,
            enablePagingParams: false,
            startParam        : false,
            reader            : {
                type        : 'json',
                rootProperty: 'data'
            }
        }
    }
});