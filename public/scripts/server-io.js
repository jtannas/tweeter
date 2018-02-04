"use strict";

/**
 * Module responsible for all communication with the back-end.
 */
const getTweet = function asyncGetSingleTweetDataFromServer(tweetId, successCb) {
  $.ajax({
    url: `/tweets/${tweetId}`,
    method: 'GET',
    success: (data, textStatus, xhr) => successCb(data, textStatus, xhr)
  });
};

const getTweets = function asyncGetTweetDataFromServer(successCb) {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: (data, textStatus, xhr) => successCb(data, textStatus, xhr)
  });
};

const submitNewTweet = function submitSerializedDataToServer(serializedData, successCb) {
  $.ajax({
    type: 'POST',
    cache: false,
    url: '/tweets',
    data: serializedData,
    success: (data, textStatus, xhr) => successCb(data, textStatus, xhr)
  });
};

const submitLike = function submitLikeForATweet(tweetId, userId, successCb) {
  $.ajax({
    type: 'POST',
    cache: false,
    url: `/tweets/${tweetId}/like`,
    data: { 'userId': userId },
    success: (data, textStatus, xhr) => successCb(data, textStatus, xhr)
  });
};

const loginUser = function loginUser(serializedLoginData, successCb) {
  $.ajax({
    type: 'POST',
    cache: false,
    url: '/login',
    data: serializedLoginData,
    success: (data, textStatus, xhr) => successCb(data, textStatus, xhr)
  });
};


const logoutUser = function logoutUser(successCb) {
  $.ajax({
    type: 'POST',
    cache: false,
    url: '/logout',
    data: '',
    success: (data, textStatus, xhr) => successCb(data, textStatus, xhr)
  });
};
