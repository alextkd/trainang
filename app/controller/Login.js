Ext.define('Ecommerce.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        stores : [
            'Categories'
        ],
        refs   : {
            loginView   : 'login-view',
            categoryView: 'category-view'
        },
        control: {
            loginView   : {
                signInCommand: 'onSignInCommand'
            },
            categoryView: {
                onSignOffCommand: 'onSignOffCommand'
            }
        }
    },

    onSignInCommand: function (view, username, password) {
        var me        = this,
            loginView = me.getLoginView();


        if (username.length === 0 || password.length === 0) {
            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype  : 'loadmask',
            message: 'Signing In...'
        });

        if (username == 'admin' && password == 'admin') {
            me.signInSuccess();
            //localStorage.setItem('username' + Ecommerce.localStorageAppId, username);
            //localStorage.setItem('password' + Ecommerce.localStorageAppId, password);
        } else {
            me.signInFailure('Login failed. Please try again later.');
        }
    },

    signInSuccess: function () {
        var loginView    = this.getLoginView(),
            categoryView = this.getCategoryView();
        loginView.setMasked(false);

        Ext.Viewport.animateActiveItem(categoryView, this.getSlideLeftTransition());
    },

    signInFailure: function (message) {
        var loginView = this.getLoginView();

        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onSignOffCommand: function () {
        var categories = Ext.getStore('Categories');

        categories.each(function (item) {
            item.set('disclosure', false);
        });
        //localStorage.removeItem('username');
        //localStorage.removeItem('password');
        Ext.Viewport.animateActiveItem(this.getLoginView(), this.getSlideRightTransition());
    }
});