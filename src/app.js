requirejs(['./routers/Appointment', './routers/User', './routers/Task'], function (AppointmentRouter, UserRouter, TaskRouter) {
    $(function () {
        var userRouter = new UserRouter(),
            appointmentRouter = new AppointmentRouter(),
            taskRouter = new TaskRouter();
        Backbone.history.start({ pushState: false, root: '/app' });
        userRouter.navigate('users', true);    
    });
});