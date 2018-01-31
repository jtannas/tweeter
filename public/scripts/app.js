/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  function timeSince(date) {
    // https://stackoverflow.com/a/3177838/7950458
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };

  function createProfilePic(tweetData) {
    const $profilePic = $('<img>').addClass("profile-picture");
    $profilePic.attr({ src: tweetData.user.avatars.small, alt: 'profile picture' });
    return $profilePic;
  }

  function createAuthorData(tweetData) {
    const $authorData = $('<div></div>').addClass('author-data');
    $authorData.append($('<h2></h2>').addClass('author-name').text(tweetData.user.name));
    $authorData.append($('<span></span>').addClass('author-handle').text(tweetData.user.handle));
    return $authorData;
  }

  function createTweetHeader(tweetData) {
    const $header = $('<header></header>');
    $header.append(createProfilePic(tweetData));
    $header.append(createAuthorData(tweetData));
    return $header;
  }

  function createTweetButtons(tweetData) {
    const $buttons = $('<div></div>').addClass('icons');
    $buttons.append($('<button href=""><i class="fas fa-retweet"></i></button>'));
    $buttons.append($('<button href=""><i class="fas fa-flag"></i></button>'));
    $buttons.append($('<button href=""><i class="fas fa-heart"></i></button>'));
    return $buttons;
  }

  function createTweetFooter(tweetData) {
    const $footer = $('<footer></footer>');
    const timeAgo = timeSince(new Date(tweetData.created_at));
    $footer.append($('<span></span>').addClass('date-created').text(timeAgo));
    $footer.append(createTweetButtons());
    return $footer;
  }

  function createTweet(tweetData) {
    const $tweet = $('<article></article>').addClass('tweet');
    $tweet.append(createTweetHeader(tweetData));
    $tweet.append($('<main></main>').text(tweetData.content.text)).append('<hr>');
    $tweet.append(createTweetFooter(tweetData));
    return $tweet;
  }

  $('#tweet-container').append(createTweet(tweetData));
});
