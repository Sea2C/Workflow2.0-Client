define([
    './Router',
    '../models/Task',
    '../models/TaskView',
    '../collections/TaskListViewModelCollection',
    '../views/task/Detail',
    '../views/task/List'
], function (Router, Task, TaskViewModel, TaskListViewModelCollection, TaskView, TaskList) {
    return Router.extend({
        routes: {
            'tasks': 'list',
            'tasks/create': 'create',
            'tasks/:id': 'view'
        },
        create: function () {
            var me = this,
                view = new TaskView({
                    model: new Task()
                }).render();

            view.on('navigate',function () {
                me.navigate('/tasks', true);
            });

            me.replace(view);
        },
        list: function(){
            var me = this,
                model = new TaskListViewModelCollection();

            model.fetch({
                success: function () {
                    var view = new TaskList({
                        model: model
                    }).render();

                    view.on('navigate',function (id) {
                        me.navigate('/tasks/' + id, true);
                    });

                    view.on('delete',function (id) {
                        var modelToDelete = new Task({ id: id});
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
                model = new Task({ id: id });
            
            model.fetch({
                success: function () {
                    // todo: revisit this for our date and time overrides
                    var view = new TaskView({
                        model: new TaskViewModel(model.attributes)
                    }).render();

                    view.on('navigate', function () {
                        me.navigate('/tasks', true);
                    });
                    me.replace(view);
                }
            });
        }
    });
});