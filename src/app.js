requirejs(['./routers/Appointment', './routers/User'], function (AppointmentRouter, UserRouter) {
    $(function () {
        var userRouter = new UserRouter(),
            appointmentRouter = new AppointmentRouter();
        Backbone.history.start({ pushState: false, root: '/app' });
        userRouter.navigate('users', true);    
    });
});