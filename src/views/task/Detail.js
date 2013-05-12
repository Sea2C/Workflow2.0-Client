define(['../../templates/task/View'], function () {
    return Backbone.View.extend({
        events: {
            "click .submit": 'submit'
        },
        render: function () {
            var me = this,
                model = me.model.toJSON();
            
            dust.render('task.view', model, function (error, output) {
                if (error) {
                    console.log(arguments);
                    alert('An unexpected rendering error has occurred');
                    return;
                }

                $(me.el).html(output);
            });

            return me;
        },
        submit: function () {
            var me = this,
                model = me.model;

            model.set(me.serialize());

            model.save(model.toJSON(),{
                success: function (){
                    me.trigger('navigate');
                }
            });
        },
        serialize: function () {
            var me = this;

            return {
                title: me.$('#title').val(),
                owner: me.$('#owner').val(),
                description: me.$('#description').val()
            };
        }
    });
});