/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.controller.Category', {
    extend  : 'Ext.app.Controller',
    requires: [
        'Ecommerce.view.categories.AddCategory',
        'Ecommerce.view.categories.EditCategory',
        'Ecommerce.model.Product',
        'Ext.MessageBox'
    ],
    config  : {
        refs   : {
            categoryView    : 'category-view',
            addCategoryView : 'add-category-view',
            editCategoryView: 'edit-category-view',
            logoutButton    : '#logoutButton',
            main            : 'products-navigation-view',
            welcomeLabel    : '#welcomeLabel'
        },
        control: {
            'category-view'                   : {
                addItem     : 'addItem',
                activate    : 'onViewActivate',
                deactivate  : 'onViewDeactivate',
                itemtap     : 'onCategoryTap',
                'deleteitem': 'deleteCategory',
                'edititem'  : 'editCategory'
            },
            'main-view #addButton'            : {
                'onAddCategory': 'onAddNewCategory'
            },
            'add-category-view #cancelButton' : {
                tap: 'hideAddCategoryView'
            },
            'add-category-view #submitButton' : {
                tap: 'addCategory'
            },
            'edit-category-view #cancelButton': {
                tap: 'hideEditCategoryView'
            },
            'edit-category-view #submitButton': {
                tap: 'onEditCategory'
            }
        }
    },

    addItem: function () {
        Ext.Viewport.add({
            xtype: 'add-category-view'
        });
    },

    hideDisclosure: function () {
        var categories = Ext.getStore('Categories');

        categories.each(function (item) {
            item.set('disclosure', false);
        });
    },

    onViewActivate: function () {
        var me            = this,
            logoutButton  = me.getLogoutButton(),
            categoryView  = me.getCategoryView(),
            navigationBar = me.getMain().getNavigationBar(),
            welcomeLabel  = me.getWelcomeLabel();

        welcomeLabel && welcomeLabel.show();
        navigationBar.setMasked(false);
        logoutButton && logoutButton.show();
        categoryView && categoryView.setMasked(false);
        this.hideDisclosure();
    },

    onViewDeactivate: function () {
        var me            = this,
            logoutButton  = me.getLogoutButton(),
            categoryView  = me.getCategoryView(),
            navigationBar = me.getMain().getNavigationBar(),
            welcomeLabel  = me.getWelcomeLabel();


        welcomeLabel && welcomeLabel.hide();
        logoutButton && logoutButton.hide();
        navigationBar.setMasked({
            xtype      : 'mask',
            transparent: true
        });
        categoryView && categoryView.setMasked(true);
        this.hideDisclosure();
    },

    onCategoryTap: function (el, index) {
        var navigationview = this.getMain(),
            categories     = Ext.getStore('Categories'),
            products,
            listConfig;

        products = categories.getAt(index).products();

        listConfig = {
            xtype: 'product-view',
            store: products
        };

        navigationview.push(listConfig);
    },

    hideAddCategoryView: function () {
        var addCategoryView = this.getAddCategoryView();

        addCategoryView && addCategoryView.destroy();
    },

    hideEditCategoryView: function () {
        var editCategoryView = this.getEditCategoryView();

        editCategoryView && editCategoryView.destroy();
    },

    addCategory: function (button, event) {
        var me              = this,
            addCategoryView = me.getAddCategoryView(),
            category        = addCategoryView.getValues(),
            categories      = Ext.getStore('Categories');

        if (!this.validateCategory(category)) {
            return;
        }

        category.disclosure = false;
        category.ord        = category.id;
        category.products   = [];
        categories.add(category);
        addCategoryView.destroy();
    },

    onEditCategory: function (button, event) {
        var me               = this,
            editCategoryView = me.getEditCategoryView(),
            category         = editCategoryView.getValues(),
            categoryId       = editCategoryView.config.categoryId,
            categories       = Ext.getStore('Categories'),
            record;

        if (!this.validateCategory(category)) {
            return;
        }
        record = categories.findRecord('category_id', categoryId);
        record.set('name', category['name']);
        editCategoryView.destroy();
    },

    deleteCategory: function (categoryId) {
        var store,
            index,
            products;

        Ext.Msg.confirm('Delete', 'Are you sure you want to delete this category',
            function (btn) {
                if (btn == 'yes') {
                    store    = Ext.getStore('Categories');
                    index    = store.findBy(function (record, id) {
                        if (categoryId == id) {
                            return true;
                        }
                    });
                    products = store.getAt(index).products();

                    products.clearData();
                    store.removeAt(index);
                }
            });

    },

    editCategory: function (categoryId) {
        var category = Ext.getStore('Categories').findRecord('category_id', categoryId);

        Ext.Viewport.add({
            xtype     : 'edit-category-view',
            record    : category,
            categoryId: categoryId
        });
    },

    validateCategory: function (values) {
        var model   = Ext.create("Ecommerce.model.Category", values),
            errors  = model.validate(),
            isValid = errors.isValid(),
            message = '',
            title;

        if (!isValid) {
            title = 'Cannot submit';
            errors.each(function (errorObj) {
                message += errorObj.getMessage() + "<br>";
            });
        } else {
            title   = 'Success';
            message = 'Category added.'
        }

        Ext.Msg.alert(title, message);
        return isValid;
    }
});