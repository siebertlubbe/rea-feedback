// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var $J = $J || jQuery.noConflict();

var feedbackObj;

function setFeedbackObj(data) {
    feedbackObj = data;
}

function setStatus(data) {
    if (data) {
      var status = data.feedback.status;
      if (status == 1) {
        $J('#surveyToolSmiles').addClass('happy')
        $J('#surveyToolSmiles').removeClass('indifferent').removeClass('sad');
      } else if (status == 2) {
        $J('#surveyToolSmiles').addClass('indifferent')
        $J('#surveyToolSmiles').removeClass('happy').removeClass('sad');
      } else if (status == 3) {
        $J('#surveyToolSmiles').addClass('sad')
        $J('#surveyToolSmiles').removeClass('indifferent').removeClass('happy');
      }
    }
//    alert(data.feedback.status);
//    alert(data);
//    feedbackObj = data;
}

function get_status() {
  $J.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000/services/feedbacks/by_user_id',
    dataType: "jsonp",
    data: {
      user_id: user_id
    },
    jsonpCallback: "setStatus"
  });
}

function post_status(user_id, status, url) {
  $J.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000/services/feedbacks/status',
    dataType: "jsonp",
    data: {
      feedback: {
        user_id: user_id, 
        status: status,
        url: url
      },
      format: "jsonp"
    },
    jsonpCallback: "setFeedbackObj",
  });
}

function post_comment(feedback_id, comment) {
  $J.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000/services/feedbacks/comments/' + feedback_id,
    data: { 
      feedback: { 
        comment: comment
      },
      format: "json"
    }
  });
}


$J(document).ready(function() {
  $J('#surveyToolSmiles a.happy').click(function (ev) {
    $J('#surveyToolSmiles').addClass('happy')
    $J('#surveyToolSmiles').removeClass('indifferent').removeClass('sad');
    var feedback = $J('div.surveyToolFeedback');
    feedback.show();
    post_status(user_id, 1, document.URL);
    return false;
  });
  $J('#surveyToolSmiles a.indifferent').click(function (ev) {
    $J('#surveyToolSmiles').addClass('indifferent')
    $J('#surveyToolSmiles').removeClass('happy').removeClass('sad');
    var feedback = $J('div.surveyToolFeedback');
    feedback.show();
    post_status(user_id, 2, document.URL);
    return false;
  });
  $J('#surveyToolSmiles a.sad').click(function (ev) {
    $J('#surveyToolSmiles').addClass('sad')
    $J('#surveyToolSmiles').removeClass('indifferent').removeClass('happy');
    var feedback = $J('div.surveyToolFeedback');
    feedback.show();
    post_status(user_id, 3, document.URL);
    return false;
  });
  $J('div.surveyToolFeedback div.actions').click(function (ev) {
    var success = $J('div.surveyToolSuccess');
    var feedback = $J('div.surveyToolFeedback');
    success.show();
    feedback.hide();
    return false;
  });
  $J('div.surveyToolFeedback div.actions a.surveyButtonSend').click(function (ev) {
    var comment = $J('#feedback_comments').val();
    post_comment(feedbackObj.feedback.id, comment);
    old_status = feedbackObj.feedback.status;
    feedbackObj = {"feedback": {"status": old_status}};
  });
});

var App = {
    Views: {},
    Controllers: {},
    init: function() {
        new App.Controllers.Feedbacks();
        Backbone.history.start();
    }
};

