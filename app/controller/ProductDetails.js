/**
 * Created by andreilakatos on 27/07/15.
 */
Ext.define('Ecommerce.controller.ProductDetails', {
    extend: 'Ext.app.Controller',
    config: {
        views  : [
            'products.EditProduct'
        ],
        refs   : {
            productDetailsView: 'productdetailsview',
            productView       : 'productview',
            editButton        : '#editButton',
            addButton         : '#addButton',
            editProductView   : 'edit-product-view',
            main              : 'main-view'
        },
        control: {
            'productdetailsview'             : {
                activate  : 'onActivateView',
                deactivate: 'onDeActivateView'
            },
            'main-view #editButton'          : {
                tap: 'onEditButtonTap'
            },
            'edit-product-view #cancelButton': {
                tap: 'hideEditProductView'
            },
            'edit-product-view #submitButton': {
                tap: 'editProduct'
            }
        }
    },

    onActivateView: function () {
        var navigationBar = this.getMain().getNavigationBar();

        navigationBar.setMasked(false);
        this.getEditButton().show();
    },

    onDeActivateView: function () {
        var navigationBar = this.getMain().getNavigationBar();

        navigationBar.setMasked(true);
        this.getEditButton().hide();
        this.getAddButton().show();
    },

    validateProduct: function (values) {
        var model   = Ext.create("Ecommerce.model.Product", values),
            errors  = model.validate(),
            isValid = errors.isValid(),
            message = '',
            title,
            s;

        if (!isValid) {
            title = 'Cannot submit';
            errors.each(function (errorObj) {
                message += errorObj.getMessage() + "<br>";

                s = Ext.String.format('field[name={0}]', errorObj.getField());
            });
        } else {
            title   = 'Success';
            message = 'Product edited.'
        }
        Ext.Msg.alert(title, message);
        return isValid;
    },

    onEditButtonTap: function () {
        var productDetailsView = this.getProductDetailsView(),
            record             = productDetailsView.getRecord();
        Ext.Viewport.add({
            xtype : "edit-product-view",
            record: record
        });
    },

    hideEditProductView: function () {
        var editProductView = this.getEditProductView();

        editProductView && editProductView.destroy();
    },

    editProduct: function () {
        var editProductView    = this.getEditProductView(),
            productDetailsView = this.getProductDetailsView(),
            product            = editProductView.getValues(),
            record             = productDetailsView.getRecord();

        if (!this.validateProduct(product)) {
            return;
        }
        record.set('name', product['name']);
        record.set('description', product['description']);
        record.set('price', product['price']);
        record.set('image', product['image']);
        this.hideEditProductView();
    }
});