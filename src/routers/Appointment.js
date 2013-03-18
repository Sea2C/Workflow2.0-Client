define([
    './Router',
    '../models/Appointment',
    '../models/AppointmentView',
    '../collections/AppointmentListViewCollection',
    '../views/appointment/Detail',
    '../views/appointment/List'
], function (Router, Appointment, AppointmentViewModel, AppointmentListViewModelCollection, AppointmentView, AppointmentList) {
    return Router.extend({
        routes: {
            'appointments': 'list',
            'appointments/create': 'create',
            'appointments/:id': 'view'
        },
        create: function () {
            var me = this,
                view = new AppointmentView({
                    model: new Appointment()
                }).render();

            view.on('navigate',function () {
                me.navigate('/appointments', true);
            });

            me.replace(view);
        },
        list: function(){
            var me = this,
                model = new AppointmentListViewModelCollection();

            model.fetch({
                success: function () {
                    var view = new AppointmentList({
                        model: model
                    }).render();

                    view.on('navigate',function (id) {
                        me.navigate('/appointments/' + id, true);
                    });

                    view.on('delete',function (id) {
                        var modelToDelete = new Appointment({ id: id});
                        modelToDelete.destroy({
                            success: function(){
                                me.list();
                            }
                        });
                    });

                    // todo: revisit this for our date and time overrides
                    me.replace(view);
                }
            });
        },
        view: function (id) {
            var me = this,
                model = new Appointment({ id: id });
            
            model.fetch({
                success: function () {
                    // todo: revisit this for our date and time overrides
                    var view = new AppointmentView({
                        model: new AppointmentViewModel(model.attributes)
                    }).render();

                    view.on('navigate', function () {
                        me.navigate('/appointments', true);
                    });

                    me.replace(view);
                }
            });
        }
    });
});