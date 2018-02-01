/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const MAX_TWEET_LENGTH = 140;

const renderTweets = function renderTweetElementsIntoPageFromArrayOfTweetData(tweetDataArray) {
  $('#tweet-container').html('');
  for (let tweetData of tweetDataArray) {
    $('#tweet-container').prepend(createTweet(tweetData));
  }
};

const getTweets = function asyncGetTweetDataFromServer(successCb) {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: tweets => successCb(tweets)
  });
};

$(document).ready(function() {
  getTweets(renderTweets);
});
