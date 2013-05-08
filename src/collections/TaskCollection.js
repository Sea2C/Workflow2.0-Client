define(['../models/Task'], function (Task) {
    return Backbone.Collection.extend({
        model: Task,
        url: '/tasks'
    });
});

