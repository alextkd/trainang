Ext.define('Ecommerce.view.Register', {
    extend  : 'Ext.form.Panel',
    xtype   : 'register-view',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Password',
        'Ext.Label',
        'Ext.Toolbar',
        'Ext.util.DelayedTask'
    ],
    config  : {
        title: 'Login',
        items: [
            {
                xtype: 'toolbar',
                title: 'Register Page'
            },
            {
                xtype : 'fieldset',
                itemId: 'userAndPasswordField',
                items : [
                    {
                        xtype      : 'textfield',
                        placeHolder: 'Name',
                        itemId     : 'nameField',
                        name       : 'name',
                        required   : true
                    },
                    {
                        xtype      : 'textfield',
                        placeHolder: 'Username',
                        itemId     : 'userNameTextField',
                        name       : 'username',
                        required   : true
                    },
                    {
                        xtype      : 'passwordfield',
                        placeHolder: 'Password',
                        itemId     : 'passwordTextField',
                        name       : 'password',
                        required   : true
                    },
                    {
                        xtype      : 'patterntextfield',
                        itemId     : 'ageTextField',
                        placeHolder: 'Age',
                        name       : 'age',
                        required   : true
                    }
                ]
            },
            {
                xtype       : 'button',
                itemId      : 'createButton',
                ui          : 'action',
                padding     : '10px',
                text        : 'Create',
                bubbleEvents: ['createuser'],
                handler     : function () {
                    this.fireEvent('createuser');
                }
            }

        ]
    }
});