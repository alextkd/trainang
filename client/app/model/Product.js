/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.model.Product', {
    extend: 'Ext.data.Model',
    config: {
        identifier : {
            type: 'uuid'
        },
        idProperty : 'product_id',
        fields     : [
            {
                name: 'product_id',
                type: 'id'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            },
            {
                name: 'price',
                type: 'int'
            },
            {
                name: 'image',
                type: 'string'
            }
        ],
        validations: [
            {
                field  : 'name',
                type   : 'presence',
                message: 'Name is required.'
            },
            {
                field  : 'price',
                type   : 'presence',
                message: 'Price is required.'
            },
            {
                field  : 'description',
                type   : 'presence',
                message: 'Description is required.'
            },
            {
                field  : 'image',
                type   : 'presence',
                message: 'Image is required.'
            }
        ],
        proxy      : {
            type  : 'localstorage',
            reader: {
                type: 'json'
            }
        },
        belongsTo  : 'Ecommerce.model.Category'
    }
});