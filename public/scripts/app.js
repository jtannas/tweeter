/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const timeSince = function returnHumanFriendlyStringOfHowLongSinceDate(date) {
    // Inspired by https://stackoverflow.com/a/3177838/7950458
    const secondsPer = [
      { name: 'year', value: 60 * 60 * 24 * 365 },
      { name: 'month', value: 60 * 60 * 24 * 30 },
      { name: 'week', value: 60 * 60 * 24 * 7 },
      { name: 'day', value: 60 * 60 * 24 },
      { name: 'hour', value: 60 * 60 },
      { name: 'minute', value: 60 },
      { name: 'second', value: 1 },
      { name: 'millisecond', value: 1e-3 },
      { name: 'microseconds', value: 1e-6 },
      { name: 'nanosecond', value: 1e-9 }
    ];

    const seconds = Math.floor((new Date() - date) / 1000);
    let interval;
    for (let unit of secondsPer) {
      interval = Math.floor(seconds / unit.value);
      if (interval > 1) {
        return `${interval} ${unit.name}s ago`;
      }
    }
    return 'Just now';
  };

  const createProfilePic = function createProfilePicElementFromTweetData(tweetData) {
    const $profilePic = $('<img>').addClass("profile-picture");
    $profilePic.attr({ src: tweetData.user.avatars.small, alt: 'profile picture' });
    return $profilePic;
  };

  const createAuthorData = function createAuthorDataElementFromTweetData(tweetData) {
    const $authorData = $('<div></div>').addClass('author-data');
    $authorData.append($('<h2></h2>').addClass('author-name').text(tweetData.user.name));
    $authorData.append($('<span></span>').addClass('author-handle').text(tweetData.user.handle));
    return $authorData;
  };

  const createTweetHeader = function createTweetHeaderElementFromTweetData(tweetData) {
    const $header = $('<header></header>');
    $header.append(createProfilePic(tweetData));
    $header.append(createAuthorData(tweetData));
    return $header;
  };

  const createTweetButtons = function createTweetInteractionButtonElements() {
    const $buttons = $('<div></div>').addClass('icons');
    $buttons.append($('<button href=""><i class="fas fa-retweet"></i></button>'));
    $buttons.append($('<button href=""><i class="fas fa-flag"></i></button>'));
    $buttons.append($('<button href=""><i class="fas fa-heart"></i></button>'));
    return $buttons;
  };

  const createTweetFooter = function createTweetFooterElementFromTweetData(tweetData) {
    const $footer = $('<footer></footer>');
    const timeAgo = timeSince(new Date(tweetData.created_at));
    const localTime = (new Date(tweetData.created_at)).toLocaleString();
    $footer.append($('<span></span>').addClass('date-created').text(timeAgo).prop('title', localTime));
    $footer.append(createTweetButtons());
    return $footer;
  };

  const createTweet = function createTweetElementFromTweetData(tweetData) {
    const $tweet = $('<article></article>').addClass('tweet');
    $tweet.append(createTweetHeader(tweetData));
    $tweet.append($('<main></main>').text(tweetData.content.text)).append('<hr>');
    $tweet.append(createTweetFooter(tweetData));
    return $tweet;
  };

  const renderTweets = function renderTweetElementsIntoPageFromArrayOfTweetData(tweetDataArray) {
    for (let tweetData of tweetDataArray) {
      $('#tweet-container').append(createTweet(tweetData));
    }
  };

  const getTweets = function asyncGetTweetDataFromServer() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: tweets => renderTweets(tweets)
    });
  };
  getTweets();
});
