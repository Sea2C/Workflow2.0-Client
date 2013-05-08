define(['../model/List', '../../templates/task/List'], function (ModelListView) {
    return ModelListView.extend({
        collection: 'tasks',
        template: 'taskList',
        events: { 
            'click .edit': 'rowClick',
            'click .delete': 'deleteRow',
            'click .dragItem.icon-tag': 'dragItem'
        },
        dragItem: function(e){
            $(e.currentTarget.parentElement).draggable({
                stop: function(event,ui){
                    var stoppos = $(this).position();
                    alert(stoppos.left + ':' + stoppos.top);
                }
            });
        },
        deleteRow: function(e){
            var currentId = $(e.currentTarget).prev('.edit').attr('data-row');
            this.trigger('delete',currentId);
            return false;
        },
        rowClick: function(e){
            var currentId = e.currentTarget.attributes['data-row'].value;
            this.trigger('navigate',currentId);
        }
    });
});