/**
 * Created by andreilakatos on 22/07/15.
 */
Ext.define('Ecommerce.view.categories.AddEditCategory', {
    extend  : 'Ext.form.FormPanel',
    xtype   : 'add-edit-category-view',
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