define(['../model/List', '../../templates/user/List'], function (ModelListView) {
    return ModelListView.extend({
        collection: 'users',
        template: 'user.list',
        events: {
            'click .btn': 'edit'
        },
        edit: function (e) {
            var me = this,
                id = $(e.currentTarget).closest('tr').attr('data-row');
            me.trigger('edit', this.model.get(id), id);
        }
    });
});