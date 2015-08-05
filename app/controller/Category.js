/**
 * Created by andreilakatos on 20/07/15.
 */
Ext.define('Ecommerce.controller.Category', {
    extend  : 'Ext.app.Controller',
    requires: [
        'Ecommerce.view.categories.AddCategory',
        'Ecommerce.model.Product'
    ],
    config  : {
        refs   : {
            categoryView   : 'category-view',
            addCategoryView: 'addcategoryview',
            logoutButton   : '#logoutButton',
            main           : 'main-view'
        },
        control: {
            'category-view'                : {
                addItem     : 'addItem',
                activate    : 'onViewActivate',
                deactivate  : 'onViewDeactivate',
                itemtap     : 'onCategoryTap',
                'deleteitem': 'deleteCategory'
            },
            'main-view #addButton'         : {
                'onAddCategory': 'onAddNewCategory'
            },
            'addcategoryview #cancelButton': {
                tap: 'hideAddCategoryView'
            },
            'addcategoryview #submitButton': {
                tap: 'addCategory'
            }
        }
    },

    addItem: function () {
        Ext.Viewport.add({
            xtype: 'addcategoryview'
        });
    },

    hideDisclosure: function () {
        var categories = Ext.getStore('Categories');

        categories.each(function (item) {
            item.set('disclosure', false);
        });
    },

    onViewActivate: function () {
        var logoutButton  = this.getLogoutButton(),
            categoryView  = this.getCategoryView(),
            navigationBar = this.getMain().getNavigationBar();

        navigationBar.setMasked(false);
        logoutButton && logoutButton.show();
        categoryView && categoryView.setMasked(false);
        this.hideDisclosure();
    },

    onViewDeactivate: function () {
        var logoutButton  = this.getLogoutButton(),
            categoryView  = this.getCategoryView(),
            navigationBar = this.getMain().getNavigationBar();

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

    addCategory: function (button, event) {
        var me              = this.getAddCategoryView(),
            category        = me.getValues(),
            categories      = Ext.getStore('Categories'),
            addCategoryView = this.getAddCategoryView();

        if (!this.validateCategory(button, event)) {
            return;
        }

        category.disclosure = false;
        category.ord        = category.id;
        category.products   = [];
        categories.add(category);
        addCategoryView.destroy();
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

    validateCategory: function () {

        var form    = this.getAddCategoryView(),
            model   = Ext.create("Ecommerce.model.Category", form.getValues()),
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