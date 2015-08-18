/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.controller.Profile', {
    extend: 'Ext.app.Controller',
    config: {
        views  : [
            'user.Profile'
        ],
        refs   : {
            mainView   : 'main-view',
            profileView: 'profile-view'
        },
        control: {
            'profile-view'            : {
                activate  : 'onViewActivate',
                deactivate: 'onViewDeActivate'
            },
            'button#editProfileButton': {
                tap: 'onSubmitButton'
            }
        }
    },

    onSubmitButton: function () {
        var me          = this,
            profileView = me.getProfileView(),
            user        = profileView.getValues(),
            record      = profileView.getRecord();

        if (user['oldpassword'] == record.get('password')) {
            user.password = user.newpassword;
        } else {
            Ext.Msg.alert('Error', 'Old Password is wrong.')
            return ;
        }
        record.set(user);
        Ext.Msg.alert('Succes', 'User updated.')
    },

    onViewDeActivate: function () {
        this.getProfileView().reset();
    },

    onViewActivate: function () {
        this.getProfileView().setRecord(Ext.getStore('UsersStored').getAt(0));
    }
});