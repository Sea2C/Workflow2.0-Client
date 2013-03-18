define([
    './Router',
    '../collections/UserCollection',
    '../views/user/Edit',
    '../views/user/List'
], function (Router, UserCollection, UserEditView, UserListView) {
    return Router.extend({
        routes: {
            'users': 'list'
        },
        list: function () {
            var me = this,
                model = new UserCollection();

            model.fetch({
                success: function () {
                    var view = new UserListView({
                        model: model
                    }).render();

                    view.on('edit', function (user, id) {
                        var editView = new UserEditView({
                            model: user
                        }).render();

                        editView.on('save', function () {
                            editView.$el.modal('hide');
                            editView.remove();
                            me.list();
                        });
                    });

                    me.replace(view);
                }
            });
        }
    });
});