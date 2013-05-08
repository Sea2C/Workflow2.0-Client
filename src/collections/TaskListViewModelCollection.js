define(['./TaskCollection', '../models/TaskView'], function (TaskCollection, TaskListViewModel) {
    return TaskCollection.extend({
        model: TaskListViewModel
    });
});