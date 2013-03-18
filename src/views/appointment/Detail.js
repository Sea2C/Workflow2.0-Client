define(['../../templates/appointment/View'], function () {
    return Backbone.View.extend({
        events: {
            "click .submit": 'submit'
        },
        render: function () {
            var me = this,
                model = me.model.toJSON();
            
            dust.render('appointment.view', model, function (error, output) {
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
            var me = this,
                m = moment(me.$('#date').val()),
                time = me.$('#time').val().split(':');

            m.hours(+time[0]);
            m.minutes(+time[1]);

            return {
                title: me.$('#title').val(),
                date: m.utc().format(),
                description: me.$('#description').val(),
                timezoneOffset: (new Date()).getTimezoneOffset()
            };
        }
    });
});