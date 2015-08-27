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
            'cart.CartNavigation',
            'user.Profile'
        ],
        refs   : {
            slideNavigation: 'main-view',
            profile        : 'profile-view',
            main           : 'products-navigation-view',
            navigationBar  : '#navigationBar',
            login          : 'login-view',
            welcomeLabel   : '#welcomeLabel',
            cartButton     : '#cartButton',
            signInLabel    : '#signInFailedLabel',
            register       : 'register-view'
        },
        control: {
            'login'                    : {
                'login'        : 'onLogin',
                'register'     : 'onRegister',
                'facebookLogin': 'onFacebookLogin'
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

    init: function () {
        this.initServices();
    },

    initServices: function () {
        var app = this.getApplication();

        app.services = {
            error   : Ext.create('Ecommerce.services.Error'),
            account : Ext.create('Ecommerce.services.Account'),
            products: Ext.create('Ecommerce.services.Products')
        };
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

            Ext.Ajax.setDefaultHeaders({
                'x-auth': localStorage.getItem('x-auth')
            });

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
            usersStoredStore = Ext.getStore('UsersStored'),
            user,
            label;

        me.getApplication().getService('account').login({
            userObject: values,
            success   : function (response) {
                responseJson = Ext.decode(response.responseText);

                user                     = responseJson.data;
                user['user_id']          = user.id;
                delete user.id;

                localStorage.setItem('x-auth', responseJson.token);
                usersStoredStore.add(user);
                Ext.Ajax.setDefaultHeaders({
                    'x-auth': localStorage.getItem('x-auth')
                });
                me.showMainView();
                Ecommerce.app.currenUser = user;
                label                    = me.getWelcomeLabel();
                label.updateData(Ecommerce.app.currenUser);
                loginform && loginform.destroy();
            },

            failure: function (response) {
                Ext.Msg.alert('Failure', response.responseText);
            }
        });
    },

    onRegister: function () {
        var me = this;

        Ext.Viewport.add({
            xtype: 'register-view'
        });
        me.getRegister().show();
    },

    onCreateUser: function () {
        var me           = this,
            registerView = me.getRegister(),
            user         = registerView.getValues();

        if (!me.validateUser(user)) {
            return false;
        }
        me.getApplication().getService('account').register({
            userObject: user,
            success   : function (response) {
                Ext.Msg.alert('Success', 'User '.concat(user.name, ' created.'));
                registerView.hide();
                Ext.defer(function () {
                    registerView && registerView.destroy();
                }, 600);
            },
            failure   : function (response) {
                Ext.Msg.alert('Failure', 'User '.concat(user.name, ' cannot be created.'));
            }
        });
    },

    onRegisterBack: function () {
        var me           = this,
            registerView = me.getRegister();

        registerView.hide();
        Ext.defer(function () {
            registerView && registerView.destroy();
        }, 600);
    },

    calculateAge: function (birthday) {
        var ageDifMs = Date.now() - birthday.getTime(),
            ageDate  = new Date(ageDifMs);

        return Math.abs(ageDate.getUTCFullYear() - 1970);
    },

    onLoginSuccess: function (user) {
        var me        = this,
            loginform = me.getLogin(),
            label;

        me.showMainView();

        Ecommerce.app.currenUser = user;
        label                    = me.getWelcomeLabel();
        label.updateData(Ecommerce.app.currenUser);
        loginform.destroy();
    },

    getUserFromFacebook: function (userId, accessToken) {
        var me          = this,
            users       = Ext.getStore('Users'),
            usersStored = Ext.getStore('UsersStored'),
            user;

        facebookConnectPlugin.api(userId + "/?fields=name,email,birthday", ["user_birthday"],
            function (result) {
                user = {
                    'name'    : result['name'],
                    'username': result['email'],
                    'password': accessToken,
                    'age'     : me.calculateAge(new Date(result['birthday']))
                };
                users.add(user);
                usersStored.add(user);
                me.onLoginSuccess(user);
            },
            function (error) {
                alert("Failed: " + error);
            });
    },

    onFacebookLogin: function () {
        var me          = this,
            users       = Ext.getStore('Users'),
            usersStored = Ext.getStore('UsersStored'),
            response,
            record,
            recordData,
            email;

        facebookConnectPlugin.login(["public_profile "], function (data) {
            response = data.authResponse;
            facebookConnectPlugin.api(response.userID + "/?fields=email", ["user_birthday"],
                function (result) {
                    email  = result['email'];
                    record = users.findRecord('email', email);
                    if (!record) {
                        me.getUserFromFacebook(response.userID, response.accessToken);
                    } else {
                        recordData = record.raw;
                        delete recordData.id;
                        usersStored.add(recordData);
                        me.onLoginSuccess(recordData);
                    }
                },
                function (error) {
                    alert("Failed: " + error);
                });
        }, function (err) {
            alert(err);
        });
    },

    validateUser: function (values) {
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
        var me          = this,
            usersStored = Ext.getStore('UsersStored');

        me.getApplication().getService('account').logout({
            userId : Ecommerce.app.currenUser['user_id'],
            success: function () {
                usersStored.removeAt(0);

                me.getMain().destroy();
                //me.getProfile().destroy();
                me.getSlideNavigation().destroy();
                localStorage.removeItem('x-auth');

                me.showLoginView();

                Ext.Msg.alert('Success', 'Logged out.')
            },

            failure: function () {
                Ext.Msg.alert('Failed', 'Failed to logout.')
            }
        });
    },

    onCartButtonTap: function () {
        Ext.Viewport.add({
            xtype: 'cart-navigation-view'
        });
        var cartView = Ext.ComponentQuery.query('cart-navigation-view')[0];
        cartView.show();
    }
});