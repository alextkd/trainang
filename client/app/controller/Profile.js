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
            user        = profileView.getValues();

        me.getApplication().getService('account').editUser({
            userObject: user,
            success   : function () {
                Ext.Msg.alert('Succes', 'User updated');
            },

            failure: function (response) {
                Ext.Msg.alert('Failure', response.responseText);
            }
        });
    },

    onViewDeActivate: function () {
        this.getProfileView().reset();
    },

    onViewActivate: function () {
        this.getProfileView().setRecord(Ext.getStore('UsersStored').getAt(0));
    }
});