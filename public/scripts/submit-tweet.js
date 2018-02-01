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
    dialog(errorMessages.join('\n'), 'Invalid Tweet (>_<)');
  } else {

    $.ajax({
      type: $(this).attr('method'),
      cache: false,
      url: $(this).attr('action'),
      data: $(this).serialize()
    }).success(() => {
      getTweets(renderTweets);
      $(this).find('textarea').val('');
      $('.new-tweet').slideUp();
    });

  }
  return false;
};

$(document).ready(() => $('.new-tweet').on('submit', 'form', submitNewTweet));
