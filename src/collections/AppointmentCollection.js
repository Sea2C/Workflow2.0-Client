define(['../models/Appointment'], function (Appointment) {
    return Backbone.Collection.extend({
        model: Appointment,
        url: '/appointments'
    });
});

