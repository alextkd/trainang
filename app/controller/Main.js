Ext.define('Ecommerce.controller.Main', {
    extend  : 'Ext.app.Controller',
    requires: [
        'Ecommerce.view.products.Product'
    ],
    config  : {
        models : [
            'User'
        ],
        stores : [
            'Users',
            'UsersStored'
        ],
        views  : [
            'Main',
            'Login',
            'Register',
            'cart.CartNavigation'
        ],
        refs   : {
            main          : 'main-view',
            navigationBar : '#navigationBar',
            login         : 'login-view',
            welcomeLabel  : '#welcomeLabel',
            register      : 'register-view',
            cartNavigation: 'cart-navigation-view'
        },
        control: {
            'login'                           : {
                'login'   : 'onLogin',
                'register': 'onRegister'
            },
            'register'                        : {
                'createuser': 'onCreateUser'
            },
            'main-view #addButton'            : {
                tap: 'onAddTap'
            },
            'main-view #logoutButton'         : {
                tap: 'onLogoutTap'
            },
            'main-view #cartButton'           : {
                tap: 'onCartButtonTap'
            },
            'cart-navigation-view #exitButton': {
                tap: 'onExitButton'
            }
        }
    },

    launch: function () {
        var me = this;

        Ext.Viewport.setMasked({
            xtype: 'loadmask'
        });

        Ext.getStore('UsersStored').load({
            callback: me.onUserLoad,
            scope   : me
        });
    },


    onUserLoad: function (users) {
        var nav,
            container,
            label;

        Ext.Viewport.setMasked(false);
        if (users && users.length > 0) {
            Ext.Viewport.add({
                xtype: 'main-view'
            });
            Ecommerce.app.currenUser = users[0].data;
            label                    = this.getWelcomeLabel();
            label.updateData(Ecommerce.app.currenUser);
        }
        else {
            Ext.Viewport.add({
                xtype: 'login-view'
            });
        }
    },

    onLogin: function () {
        var me               = this,
            loginform        = me.getLogin(),
            values           = loginform.getValues(),
            usersStore       = Ext.getStore('Users'),
            usersStoredStore = Ext.getStore('UsersStored'),
            user,
            label;

        user = usersStore.findRecord('username', values['username']);

        if (user && user.get('password') === values['password']) {
            user                     = user.getData();
            loginform && loginform.destroy();
            Ext.Viewport.add({
                xtype: 'main-view'
            });

            delete user.id;

            usersStoredStore.add(user);
            Ecommerce.app.currenUser = user;

            label = this.getWelcomeLabel();
            label.updateData(Ecommerce.app.currenUser);
            loginform.destroy();
        } else {
            label = loginform.getComponent('signInFailedLabel');
            label.show();
        }
    },

    onRegister: function () {
        var login = this.getLogin();

        login && login.destroy();

        Ext.Viewport.add({
            xtype: 'register-view'
        });
    },

    onCreateUser: function () {
        var registerView = this.getRegister(),
            user         = registerView.getValues(),
            usersStore   = Ext.getStore('Users');

        usersStore.add(user);
        Ext.Msg.alert('Succes', ''.concat('User ', user['name'], ' created'));
        registerView && registerView.destroy();
        Ext.Viewport.add({
            xtype: 'login-view'
        });
    },

    onAddTap: function (currentview) {
        var currentView = this.getMain().getActiveItem();

        currentView.fireEvent('addItem');
    },

    onLogoutTap: function () {
        var categories  = Ext.getStore('Categories'),
            usersStored = Ext.getStore('UsersStored'),
            currentView = this.getMain().getActiveItem(),
            products;

        if (currentView.$className == 'Ecommerce.view.Product') {
            products = currentView.getStore();
            products.each(function (item) {
                item.set('disclosure', false);
            });
        }

        usersStored.removeAt(0);
        categories.each(function (item) {
            item.set('disclosure', false);
        });

        this.getMain().destroy();

        Ext.Viewport.add({
            xtype: 'login-view'
        });
    },

    signInFailure: function (message) {
        var loginView = this.getLoginView();

        loginView.showSignInFailedMessage(message);
        loginView.setMasked(false);
    },

    onCartButtonTap: function () {
        Ext.Viewport.add({
            xtype: 'cart-navigation-view'
        })
    },

    onExitButton: function () {
        var cartNavigationView = this.getCartNavigation();

        cartNavigationView  && cartNavigationView .destroy();
    }
});