App.Controllers.Feedbacks = Backbone.Router.extend({
    routes: {
        "":                         "index"
    },
    
    index: function() {
        $.getJSON('/feedbacks', function(data) {
            if(data) {
                var feedbacks = _(data).map(function(i) { return new Feedback(i); });
                new App.Views.Index({ feedbacks: feedbacks });
            } else {
                new Error({ message: "Error loading feedbacks." });
            }
        });
    }
    
});