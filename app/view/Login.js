Ext.define('Ecommerce.view.Login', {
    extend  : 'Ext.form.Panel',
    xtype   : 'login-view',
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
                title: 'Login Page'
            },
            {
                xtype        : 'label',
                html         : 'Login failed. Please enter the correct credentials.',
                itemId       : 'signInFailedLabel',
                hidden       : true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style        : 'color:#990000;margin:5px 0px;'
            },
            {
                xtype : 'fieldset',
                itemId: 'userAndPasswordField',
                items : [
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
                    }
                ]
            },
            {
                xtype       : 'button',
                itemId      : 'logInButton',
                ui          : 'action',
                padding     : '10px',
                text        : 'Go',
                bubbleEvents: ['login'],
                handler     : function () {
                    this.fireEvent('login');
                }
            },
            {
                xtype       : 'button',
                itemId      : 'registerButton',
                ui          : 'action',
                padding     : '10px',
                text        : 'Register',
                margin      : '10 0 0 0',
                bubbleEvents: ['register'],
                handler     : function () {
                    this.fireEvent('register');
                }
            }

        ]
    }
});