define(['./Appointment'], function (Appointment) {
    return Appointment.extend({
        initialize: function (attributes) {
            var m,
                date,
                offset,
                me = this;
            
            if ((date = attributes.date)) {
                m = moment(date);
                me.set({
                    date: m.format('YYYY-MM-DD'),
                    datetime: attributes.date,
                    time: m.format('HH:mm')
                });
            }
        }
    });
});