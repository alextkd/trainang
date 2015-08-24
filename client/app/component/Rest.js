/**
 * Created by andreilakatos on 22/07/15.
 */
Ext.define('Ecommerce.component.Rest', {
    extend  : 'Ext.data.proxy.Rest',
    alias   : 'proxy.custom-rest',
    buildUrl: function (request) {
        debugger;
        var me     = this,
            url    = me.getUrl(request),
            action = request.getAction(),
            record,
            association,
            propertyId,
            propertyValue,
            filter;

        if (action == 'destroy' || action == 'update') {
            record        = request.getRecords()[0];
            association   = record && record.getAssociations();
            propertyId    = association.getAt(0).getForeignKey();
            propertyValue = record.modified[propertyId];
        } else {
            filter        = request.getOperation().getFilters()[0];
            propertyId    = filter.getProperty();
            propertyValue = filter.getValue();
        }
        url = url.replace(propertyId, propertyValue);
        request.setUrl(url);

        return me.callParent([request]);
    }
});