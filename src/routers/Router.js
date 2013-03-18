define(function () {
    return Backbone.Router.extend({
        selector: '#content',
        replace: function (content) {
            var me = this,
                target = (me.target = me.target || $(me.selector));

            target.html(content.$el || content);
        }
    });
});