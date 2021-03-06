Ext.define('Ecommerce.component.CustomList', {
    extend: 'Ext.dataview.List',
    xtype : 'customlist',
    config: {
        selectedCls: false,
        itemCls: 'item-swipe'
    },

    initialize: function () {
        var me = this;

        me.callParent(arguments);

        this.element.on('touchend', 'onTouchEnd', this, {
            delegate: '.name'
        });
        this.element.on('touchstart', 'onTouchStart', this, {
            delegate: '.name'
        });
        this.element.on('touchmove', 'onTouchMove', this, {
            delegate: '.name'
        });
        this.element.on('tap', 'onActionTap', this, {
            delegate: '.action'
        });
    },

    onTouchStart: function (ev) {
        var me = this;

        me.draggable = true;
        me.startX    = ev.pageX;
        me.startY    = ev.pageY;
        if (me.oldTarget) {
            me.hideAction(me.oldTarget, function () {
                delete me.oldTarget;
                me.actionshown = false;
            });
        }
        ev.stopEvent();
    },

    showAction: function (target, callback) {
        var me = this;

        target.style.transition = 'right 0.5s';
        target.style.right      = '25%';

        setTimeout(function () {
            target.style.transition = '';
            callback && callback.call(me);
        }, 500);
    },

    hideAction: function (target, callback) {
        var me = this;

        target.style.transition = 'right 0.2s';
        target.style.right      = '0';

        setTimeout(function () {
            target.style.transition = '';
            callback && callback.call(me);
        }, 200);
    },

    onTouchEnd: function (ev) {
        var targetR,
            target = ev.target,
            me     = this;

        me.draggable = false;
        targetR      = parseInt(target.style.right, 10);

        if (me.actionshown) {
            ev.stopEvent();
        }
        if (targetR < 50 || me.actionshown) {
            me.hideAction(target, function () {
                me.actionshown = false;
            });
        } else if (targetR >= 50) {
            me.showAction(target, function () {
                me.actionshown = true;
                me.oldTarget   = target;
            });
        }
        Ext.defer(function() {
            me.setScrollable(true);
        }, 100, me);
    },

    onTouchMove: function (ev) {
        var me = this,
            newX,
            newY,
            itemSwipe,
            action,
            actionWidth;
        itemSwipe = Ext.fly(ev.getTarget()).up('.item-swipe');
        if (itemSwipe && itemSwipe.down('.action')) {
            actionWidth = itemSwipe.down('.action') ? itemSwipe.down('.action').getWidth() + 50 : 100;
        } else {
            actionWidth = 100;
        }

        if (me.draggable == true) {

            newX = this.startX - ev.pageX;
            newY = this.startY - ev.pageY;

            if (newX > 0 && newX < actionWidth) {
                if (newY < newX) {
                    me.setScrollable(false);
                } else {
                    me.setScrollable(true);
                }
                ev.target.style.right = ''.concat(newX, 'px');
            }
        }
    },

    onActionTap: function (ev, element) {
        var me     = this,
            target = element,
            action = target.dataset ? target.dataset.action : target.getAttribute('data-action'),
            id     = target.dataset ? target.dataset.id : target.getAttribute('data-id');

        me.hideAction(ev.target);
        me.fireEvent(action, id);
        ev.stopEvent();
    }
});