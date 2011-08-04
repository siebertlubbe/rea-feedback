// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var $J = $J || jQuery.noConflict();

var feedbackObj;

function post_status(user_id, status, url) {
  $J.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000/services/feedbacks',
    data: { 
      feedback: {
        user_id: user_id, 
        status: status,
        url: url
      },
      format: "json"
    },
    success: function(data) {
      if (console && console.log){
        console.log( 'Sample of data:', data.slice(0,100) );
      }
      feedbackObj = data;
    }
  });
}

function post_comment(feedback_id, comment) {
  $J.ajax({
    type: 'PUT',
    url: 'http://127.0.0.1:3000/services/feedbacks/' + feedback_id,
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
    post_status('foo', 1, document.URL);
    console.log(feedbackObj);
    return false;
  });
  $J('#surveyToolSmiles a.indifferent').click(function (ev) {
    $J('#surveyToolSmiles').addClass('indifferent')
    $J('#surveyToolSmiles').removeClass('happy').removeClass('sad');
    var feedback = $J('div.surveyToolFeedback');
    feedback.show();
    post_status('foo', 2, document.URL);
    console.log(feedbackObj);
    return false;
  });
  $J('#surveyToolSmiles a.sad').click(function (ev) {
    $J('#surveyToolSmiles').addClass('sad')
    $J('#surveyToolSmiles').removeClass('indifferent').removeClass('sad');
    var feedback = $J('div.surveyToolFeedback');
    feedback.show();
    post_status('foo', 3, document.URL);
    console.log(feedbackObj);
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
    var comment = $J('#feedback_comments');
    post_comment(feedbackObj.id, comment);
  });
});


/*

  $J('#update-toggle-link').click(function (ev) {
    var headCode = $J('#head-code'),
        toggleLinkText = $J('#toggle-link-text');

    if (headCode.is(':visible')) {
        headCode.hide();
        toggleLinkText.html('Edit Head Code');
    } else {
        headCode.show();
        toggleLinkText.html('Hide Head Code');
    }
    return false;
  });
  $J('#preview a.needs_preview').click(function (ev) {
    $J(this).removeClass('needs_preview');
    if ($J('a.needs_preview').length == 0) {
      $J('#preview-publish-button').removeClass('inactive');
    }
  });
  $J('#preview-publish-button').click(function (ev) {
    if ($J(this).hasClass('inactive')) {
      return false;
    }
  });


*/