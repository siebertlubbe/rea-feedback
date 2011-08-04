var Feeback = Backbone.Model.extend({
    url : function() {
      var base = 'feedbacks';
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) == '/' ? '' : '/') + this.id;
    }
});