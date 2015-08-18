/**
 * Created by andreilakatos on 22/07/15.
 */
Ext.define('Ecommerce.view.products.AddEditProduct', {
    extend  : 'Ext.form.FormPanel',
    requires: [
        'Ecommerce.component.PatternText'
    ],
    config  : {
        width   : '80%',
        height  : '50%',
        items   : [
            {
                xtype : 'fieldset',
                itemId: 'userAndPasswordField',
                items : [
                    {
                        xtype      : 'textfield',
                        placeHolder: 'name',
                        itemId     : 'nameTextField',
                        name       : 'name',
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype      : 'textfield',
                        placeHolder: 'description',
                        itemId     : 'descriptionTextField',
                        name       : 'description',
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype      : 'patterntextfield',
                        placeHolder: 'price',
                        itemId     : 'priceTextField',
                        name       : 'price',
                        minValue   : 5,
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype      : 'textfield',
                        placeHolder: 'image',
                        itemId     : 'imageTextField',
                        name       : 'image',
                        required   : true,
                        allowBlank : false
                    }
                ]
            },
            {
                xtype : 'toolbar',
                docked: 'bottom',
                items : [
                    {
                        xtype : 'button',
                        text  : 'submit',
                        itemId: 'submitButton'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype : 'button',
                        text  : 'cancel',
                        itemId: 'cancelButton'
                    }
                ]
            }
        ],
        modal   : true,
        centered: true
    }
});