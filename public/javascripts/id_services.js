function post_status(user_id, status, url) {
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:3000/services/feedbacks',
    data: { 
      feedback: {
        user_id: user_id, 
        status: status,
        url: url 
      }
    }
  });
}

function post_comment(feedback_id, comment) {
  $.ajax({
    type: 'PUT',
    url: 'http://127.0.0.1:3000/services/feedbacks/' + feedback_id,
    data: { 
      feedback: { 
        comment: comment
      }
    }
  });
}
