/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.model.Category', {
    extend: 'Ext.data.Model',
    config: {
        identifier : {
            type: 'uuid'
        },
        idProperty : 'category_id',
        fields     : [
            {
                name: 'category_id'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'ord',
                type: 'int'
            },
            {
                name        : 'disclosure',
                type        : 'boolean',
                defaultValue: false
            }
        ],
        validations: [
            {
                field  : 'name',
                type   : 'presence',
                message: 'Name is required.'
            }
        ],
        hasMany    : {
            model     : 'Ecommerce.model.Product',
            name      : 'products',
            autoLoad  : true,
            autoSync  : true,
            primaryKey: 'category_id'
        }
    }
});