$(document).ready(() => {
  const MAX_TWEET_LEN = 140;

  const charCounter = function updateRemainingTweetLengthCounter(event) {
    const currLen = $(this).val().length;
    const counter = $(this).siblings('.counter');
    counter.text(MAX_TWEET_LEN - currLen);
    counter.toggleClass('invalid', currLen > MAX_TWEET_LEN);
  };

  $('.new-tweet').on('input', 'textarea', charCounter);
});
