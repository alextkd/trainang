/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.model.User', {
    extend: 'Ext.data.Model',
    config: {
        identifier: {
            type: 'uuid'
        },
        fields    : [
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
                type        : 'int',
                defaultValue: 18
            }
        ]
    }
});