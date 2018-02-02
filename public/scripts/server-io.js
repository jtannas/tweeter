/**
 * Module responsible for all communication with the back-end.
 */

const getTweets = function asyncGetTweetDataFromServer(successCb) {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: tweets => successCb(tweets)
  });
};

const submitNewTweet = function submitSerializedDataToServer(serializedData, successCb) {
  $.ajax({
    type: 'POST',
    cache: false,
    url: '/tweets',
    data: serializedData,
    success: ack => successCb(ack)
  });
};
