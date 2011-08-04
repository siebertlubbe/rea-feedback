App.Views.Index = Backbone.View.extend({
    initialize: function() {
        this.feedbacks = this.options.feedbacks;
        this.render();
    },
    
    render: function() {
        if(this.feedbacks.length > 0) {
            var out = "<h3><a href='#new'>Create New</a></h3><ul>";
            _(this.feedbacks).each(function(item) {
                out += "<li><a href='#feedbacks/" + item.id + "'>" + item.escape('title') + "</a></li>";
            });
            out += "</ul>";
        } else {
            out = "<h3>No feedbacks! <a href='#new'>Create one</a></h3>";
        }
        $(this.el).html(out);
        $('#app').html(this.el);
    }
});