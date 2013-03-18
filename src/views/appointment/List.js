define(['../model/List', '../../templates/appointment/List'], function (ModelListView) {
    return ModelListView.extend({
        collection: 'appointments',
        template: 'appointment.list',
        events: { 
            'click .appointment-list-row': 'rowClick',
            'click .delete': 'deleteRow'
        },
        deleteRow: function(e){
            var currentId = $(e.currentTarget).closest('tr').attr('data-row');
            this.trigger('delete',currentId);
            return false;
        },
        rowClick: function(e){
            var currentId = e.currentTarget.attributes['data-row'].value;
            this.trigger('navigate',currentId);
        }
    });
});