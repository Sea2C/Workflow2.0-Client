define(['../models/User'], function (User) {
    return Backbone.Collection.extend({
        model: User,
        url: '/users'
    });
});