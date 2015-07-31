/**
 * Created by andreilakatos on 22/07/15.
 */
Ext.define('Ecommerce.view.categories.AddCategory', {
    extend  : 'Ext.form.FormPanel',
    alias   : 'widget.addcategoryview',
    requires: [
        'Ecommerce.component.PatternText',
        'Ext.MessageBox'
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