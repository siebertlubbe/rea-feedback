function post_status(status, user_id, url) {
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

