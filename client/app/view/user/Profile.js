/**
 * Created by andreilakatos on 22/07/15.
 */
Ext.define('Ecommerce.view.user.Profile', {
    extend  : 'Ext.form.FormPanel',
    xtype   : 'profile-view',
    requires: [
        'Ecommerce.component.PatternText'
    ],
    config  : {
        items: [
            {
                xtype : 'fieldset',
                itemId: 'profileEditField',
                items : [
                    {
                        xtype      : 'textfield',
                        placeHolder: 'Name',
                        name       : 'name',
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype      : 'textfield',
                        placeHolder: 'Username',
                        name       : 'username',
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype      : 'passwordfield',
                        placeHolder: 'Old Password',
                        name       : 'oldpassword',
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype      : 'passwordfield',
                        placeHolder: 'New Password',
                        name       : 'newpassword',
                        required   : true,
                        allowBlank : false
                    },
                    {
                        xtype      : 'patterntextfield',
                        placeHolder: 'Age',
                        name       : 'age',
                        required   : true,
                        allowBlank : false
                    }
                ]
            },
            {
                xtype : 'toolbar',
                docked: 'top',
                itemId: 'profileToolbar',
                items : [
                    {
                        xtype : 'button',
                        text  : 'submit',
                        itemId: 'editProfileButton'
                    }
                ]
            }
        ]
    },

    initialize: function () {
        var me               = this,
            usersStoredStore = Ext.getStore('UsersStored'),
            user,
            record;

        me.callParent(arguments);
        user                 = usersStoredStore.getAt(0);
        me.setRecord(user);
    }
});