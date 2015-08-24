/**
 * Created by andreilakatos on 17/07/15.
 */
Ext.define('Ecommerce.model.Category', {
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
                name: 'name',
                type: 'string'
            },
            {
                name: 'ord',
                type: 'int'
            }
        ],
        validations: [
            {
                field  : 'name',
                type   : 'presence',
                message: 'Name is required.'
            }
        ],
        /*hasMany    : {
            storeId     : 'Productsstore',
            model       : 'Ecommerce.model.Product',
            name        : 'products',
            //autoLoad    : true,
            batchActions: true,
            autoSync    : true
        },*/
        proxy      : {
            type              : 'rest',
            url               : 'http://localhost:8080/api/categories',
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