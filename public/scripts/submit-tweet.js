$(document).ready(function() {
  const submitNewTweet = function submitSerializedNewTweetToServer(event) {
    event.preventDefault();
    const form = $(this.closest('form'));
    $.ajax({
      type: form.attr('method'),
      cache: false,
      url: form.attr('action'),
      data: form.serialize(),
      success: () => console.log('tweet submitted')
    });
  };

  $('.new-tweet').on('click', 'button', submitNewTweet);
});
