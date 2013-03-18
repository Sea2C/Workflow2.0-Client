define(['../../templates/user/Edit'], function () {
    return Backbone.View.extend({
        events: {
            'click .btn-primary': 'save',
            'click button.remove': 'remove'
        },
        render: function () {
            var me = this,
                model = me.model.toJSON();
            
            dust.render('user.edit', model, function (error, output) {
                var $el;

                if (error) {
                    console.log(arguments);
                    alert('An unexpected rendering error has occurred');
                    return;
                }

                $el = $(me.el).html(output);
                $el.find('select').val(model.role);
                $el.modal();
            });

            return me;
        },
        save: function () {
            var me = this,
                model = me.model;
            
            model.set({ role: $(me.el).find('select').val() });

            model.save(model.toJSON(),{
                success: function (){
                    me.trigger('save');
                    me.$el.modal('hide');
                }
            });
        }
    });
});