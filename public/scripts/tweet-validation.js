/** To isolate the function definition from the DOM definition, a factory function is used */
const charCounterCbFactory = function createCallbackForARemainingLengthCounter(newTweetObj, maxLen) {
  return function updateRemainingTweetLengthCounter(event) {
    const currLen = newTweetObj.content.val().length;
    newTweetObj.counter.text(maxLen - currLen);
    newTweetObj.counter.toggleClass('invalid', currLen > maxLen);
    newTweetObj.content.toggleClass('invalid', currLen > maxLen);
  };
};


/** To isolate the function definition from the DOM definition, a factory function is used */
const tweetValidatorFactory = function createTweetValidatorUsingMaxLen(maxLen) {
  return function returnErrorFromValidationChecksOnTweet(tweetText) {
    const errorMessages = [];
    if (!tweetText || tweetText.length === 0) {
      errorMessages.push('You must enter content into your tweet');
    }
    if (tweetText.length >= maxLen) {
      errorMessages.push(`The maximum length for a tweet is ${maxLen} characters`);
    }
    return (errorMessages.length ? errorMessages : null);
  };
};
