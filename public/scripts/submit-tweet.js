$(document).ready(function() {
  const MAX_TWEET_LENGTH = 140;

  $('dialog').on('click', '.close', function(event) { $(this).parent()[0].close(); });

  const flash = function renderFlashedMessage(message, title = 'Hey!') {
    const dialog = $('.flash');
    dialog.find('h1').text(title);
    dialog.find('p').text(message);
    dialog[0].showModal();
  };

  const validateTweet = function returnErrorFromValidationChecksOnTweet(tweetText) {
    const errorMessages = [];
    if (!tweetText || tweetText.length === 0) {
      errorMessages.push('You must enter content into your tweet');
    }
    if (tweetText.length >= MAX_TWEET_LENGTH) {
      errorMessages.push(`The maximum length for a tweet is ${MAX_TWEET_LENGTH} characters`);
    }
    return errorMessages;
  };

  const submitNewTweet = function submitSerializedNewTweetToServer(event) {
    event.preventDefault();

    const errorMessages = validateTweet($(this).find('textarea').val());
    if (errorMessages.length) {
      flash(errorMessages.join('\n'), 'Invalid Tweet (>_<)');
    } else {
      $.ajax({
        type: $(this).attr('method'),
        cache: false,
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: () => console.log('tweet submitted')
      });
    }
    return false;
  };

  $('.new-tweet').on('submit', 'form', submitNewTweet);
});
