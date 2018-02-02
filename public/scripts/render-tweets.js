/**
 * Module responsible for functions that are used to render tweet data into
 * the DOM.
 */

const createProfilePic = function createProfilePicElementFromTweetData(tweetData) {
  const profilePic = $('<img>').addClass("profile-picture");
  profilePic.attr({ src: tweetData.user.avatars.small, alt: 'profile picture' });
  return profilePic;
};

const createAuthorData = function createAuthorDataElementFromTweetData(tweetData) {
  const authorData = $('<div></div>').addClass('author-data');
  authorData.append($('<h2></h2>').addClass('author-name').text(tweetData.user.name));
  authorData.append($('<span></span>').addClass('author-handle').text(tweetData.user.handle));
  return authorData;
};

const createTweetHeader = function createTweetHeaderElementFromTweetData(tweetData) {
  const header = $('<header></header>');
  header.append(createProfilePic(tweetData));
  header.append(createAuthorData(tweetData));
  return header;
};

const createTweetButtons = function createTweetInteractionButtonElements() {
  const buttons = $('<div></div>').addClass('icons');
  buttons.append($('<button href=""><i class="fas fa-retweet"></i></button>'));
  buttons.append($('<button href=""><i class="fas fa-flag"></i></button>'));
  buttons.append($('<button href=""><i class="fas fa-heart"></i></button>'));
  return buttons;
};

const createTweetFooter = function createTweetFooterElementFromTweetData(tweetData) {
  const footer = $('<footer></footer>');
  const timeAgo = timeSince(new Date(tweetData.createdAt));
  const localTime = (new Date(tweetData.createdAt)).toLocaleString();
  footer.append($('<span></span>').addClass('date-created').text(timeAgo).prop('title', localTime));
  footer.append(createTweetButtons());
  return footer;
};

const createTweet = function createTweetElementFromTweetData(tweetData) {
  const tweet = $('<article></article>').addClass('tweet');
  tweet.append(createTweetHeader(tweetData));
  tweet.append($('<main></main>').text(tweetData.content.text)).append('<hr>');
  tweet.append(createTweetFooter(tweetData));
  return tweet;
};

/** To isolate the function definition from the DOM definition, a factory function is used*/
const renderTweetFactory = function makeAFunctionToRenderTweets(tweetContainer) {
  return function renderTweetElementsIntoPageFromArrayOfTweetData(tweetDataArray) {
    tweetContainer.html('');
    for (let tweetData of tweetDataArray) {
      tweetContainer.prepend(createTweet(tweetData));
    }
  };
};
