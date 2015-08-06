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
            main         : 'main-view',
            navigationBar: '#navigationBar',
            login        : 'login-view',
            welcomeLabel : '#welcomeLabel',
            cartButton   : '#cartButton',
            signInLabel  : '#signInFailedLabel',
            register     : 'register-view'
        },
        control: {
            'login'                    : {
                'login'   : 'onLogin',
                'register': 'onRegister'
            },
            'register'                 : {
                'createuser': 'onCreateUser'
            },
            'register-view #backButton': {
                tap: 'onRegisterBack'
            },
            'main-view #addButton'     : {
                tap: 'onAddTap'
            },
            'main-view #logoutButton'  : {
                tap: 'onLogoutTap'
            },
            'main-view #cartButton'    : {
                tap: 'onCartButtonTap'
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

    showLoginView: function () {
        Ext.Viewport.add({
            xtype: 'login-view'
        });
    },

    showMainView: function () {
        Ext.Viewport.add({
            xtype: 'main-view'
        });
    },

    onUserLoad: function (users) {
        var me = this,
            label,
            cartStore;

        Ext.Viewport.setMasked(false);
        if (users && users.length > 0) {

            me.showMainView();

            cartStore = Ext.getStore('Cart');

            if (cartStore.getCount() > 0) {
                me.getCartButton().show();
            }

            Ecommerce.app.currenUser = users[0].data;
            label                    = me.getWelcomeLabel();
            label.updateData(Ecommerce.app.currenUser);
        }
        else {
            me.showLoginView();
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

            me.showMainView();

            delete user.id;

            usersStoredStore.add(user);
            Ecommerce.app.currenUser = user;

            label = this.getWelcomeLabel();
            label.updateData(Ecommerce.app.currenUser);
            loginform.destroy();
        } else {
            label = me.getSignInLabel();
            label.show();
        }
    },

    onRegister: function () {
        var me    = this,
            login = me.getLogin();

        login && login.destroy();

        Ext.Viewport.add({
            xtype: 'register-view'
        });
        me.getRegister().show();
    },

    onCreateUser: function () {
        var me           = this,
            registerView = me.getRegister(),
            user         = registerView.getValues(),
            usersStore   = Ext.getStore('Users');

        usersStore.add(user);
        if (!me.validateUser(user)) {
            return false;
        }
        registerView.hide();
        Ext.defer(function () {
            registerView && registerView.destroy();
        }, 600);
        me.showLoginView();
        Ext.Msg.alert('Succes', ''.concat('User ', user['name'], ' created'));
    },

    onRegisterBack: function () {
        var me = this,
            registerView = me.getRegister();

        registerView.hide();
        Ext.defer(function () {
            registerView && registerView.destroy();
        }, 600);
        me.showLoginView();
    },

    validateUser  : function (values) {
        var model   = Ext.create("Ecommerce.model.User", values),
            errors  = model.validate(),
            isValid = errors.isValid(),
            message = '',
            title;

        if (!isValid) {
            title = 'Cannot submit';
            errors.each(function (errorObj) {
                message += errorObj.getMessage() + "<br>";
            });

            Ext.Msg.alert(title, message);
        }
        return isValid;
    },

    onAddTap: function (currentview) {
        var currentView = this.getMain().getActiveItem();

        currentView.fireEvent('addItem');
    },

    onLogoutTap: function () {
        var me = this,
            categories  = Ext.getStore('Categories'),
            usersStored = Ext.getStore('UsersStored'),
            currentView = me.getMain().getActiveItem(),
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

        me.getMain().destroy();

        me.showLoginView();
    },

    onCartButtonTap: function () {
        Ext.Viewport.add({
            xtype: 'cart-navigation-view'
        });
        var cartView = Ext.ComponentQuery.query('cart-navigation-view')[0];
        cartView.show();
    }
});