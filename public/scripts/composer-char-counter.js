const charCounter = function updateRemainingTweetLengthCounter(event) {
  const currLen = $(this).val().length;
  const counter = $(this).siblings('.counter');
  counter.text(MAX_TWEET_LENGTH - currLen);
  counter.toggleClass('invalid', currLen > MAX_TWEET_LENGTH);
};

$(document).ready(() => {
  $('.new-tweet').on('input', 'textarea', charCounter);
});
