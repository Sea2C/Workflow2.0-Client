define(['./AppointmentCollection', '../models/AppointmentView'], function (AppointmentCollection, AppointmentListViewModel) {
    return AppointmentCollection.extend({
        model: AppointmentListViewModel
    });
});