Ext.define('Ecommerce.view.Login', {
    extend  : 'Ext.form.Panel',
    xtype   : 'login-view',
    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Password',
        'Ext.Label',
        'Ext.Toolbar'
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
                cls          : 'login-label',
                html         : 'Login failed. Please enter the correct credentials.',
                itemId       : 'signInFailedLabel',
                hidden       : true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn'
            },
            {
                xtype : 'fieldset',
                itemId: 'userAndPasswordField',
                items : [
                    {
                        xtype      : 'textfield',
                        placeHolder: 'Email',
                        name       : 'email',
                        required   : true
                    },
                    {
                        xtype      : 'passwordfield',
                        placeHolder: 'Password',
                        name       : 'password',
                        required   : true
                    }
                ]
            },
            {
                xtype       : 'button',
                cls         : 'login-button',
                itemId      : 'logInButton',
                ui          : 'action',
                text        : 'Go',
                bubbleEvents: ['login'],
                handler     : function () {
                    this.fireEvent('login');
                }
            },
            {
                xtype       : 'button',
                cls         : 'register-button',
                itemId      : 'registerButton',
                ui          : 'action',
                text        : 'Register',
                bubbleEvents: ['register'],
                handler     : function () {
                    this.fireEvent('register');
                }
            },
            {
                xtype       : 'button',
                pressedCls  : '',
                cls         : 'facebook-button',
                bubbleEvents: ['facebookLogin'],
                handler     : function () {
                    this.fireEvent('facebookLogin');
                }
            }
        ]
    }
});