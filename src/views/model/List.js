define(function () {
    return Backbone.View.extend({
        className: 'row-fluid', 
        render: function () {
            var me = this,
                context = me.createTemplateContext();

            dust.render(me.template, context, function (error, output) {
                if (error) {
                    me.trigger('error', error);
                    return;
                }

                $(me.el).html(output);
            });

            return me;
        },
        createTemplateContext: function () {
            var context,
                me = this,
                model = me.model.toJSON(),
                collection = me.collection;

            if (typeof collection === 'string') {
                context = {};
                context[collection] = model;
            } else {
                context = model;
            }

            return context;
        }
    });
});