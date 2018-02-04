"use strict";

/**
 * Entry point to the front end javascript; contains all jQuery references to the DOM.
 *
 * All direct references to the DOM are made in this file using jQuery.
 * Any given element is selected only once and then stored in an object.
 *
 * Helper functions & callbacks are created in other files. If they need to
 * interact with the DOM, I use dependency injection to supply the DOM elements
 * from this file.
 * e.g.
 *     before:    function() { myElement.manipulate(...) };
 *     after:     function(element) { return function() { element.manipulate(...) }};
 *
 * This decouples the function definitions from the DOM so I don't have to hunt around
 * for errant jQuery selectors whenever I make a style change.
 *
 * This makes this $(document).ready function pretty long. If someday it gets excessive,
 * then a global ELEMENT_SELECTORS object could be used to modularize the code further.
 */

$(document).ready(() => {

  /** Set tweet params & validation */
  const maxTweetLength = 140;
  const validateTweet = tweetValidatorFactory(maxTweetLength);


  /** Connect the get tweets and render tweets */
  const renderTweets = renderTweetFactory($('#tweet-container'));
  const refreshTweets = () => getTweets(renderTweets);


  /** Create the flash function */
  const flashDialog = { main: $('.flash') };
  flashDialog.title = flashDialog.main.find('.title');
  flashDialog.message = flashDialog.main.find('.message');
  flashDialog.closeButton = flashDialog.main.find('.close');
  const flash = flashFunctionFactory(flashDialog);

  /** Create the login references */
  const loginDialog = { main: $('#login') };
  loginDialog.showButton = $('nav').find('.login');
  loginDialog.form = loginDialog.main.find('form');
  loginDialog.cancelButton = loginDialog.main.find('.cancel');
  loginDialog.submitButton = loginDialog.main.find('.submit');

  const registerDialog = { main: $('#register') };
  registerDialog.form = registerDialog.main.find('form');
  registerDialog.showButton = $('nav').find('.register');
  registerDialog.cancelButton = registerDialog.main.find('.cancel');
  registerDialog.submitButton = registerDialog.main.find('.submit');

  const logoutButton = $('.logout');

  applyUserFunctions(loginDialog, registerDialog, logoutButton);


  /** Set up the newTweet references */
  const newTweet = { main: $('.new-tweet') };
  newTweet.form = newTweet.main.find('form');
  newTweet.counter = newTweet.main.find('.counter');
  newTweet.content = newTweet.main.find('textarea');


  /** Set up the newTweet behaviours */
  const charCounterCb = charCounterCbFactory(newTweet, maxTweetLength);
  newTweet.main.hide();
  newTweet.content.on('change input', charCounterCb);

  newTweet.form.on('submit', event => {
    event.preventDefault();
    const errorMessages = validateTweet(newTweet.content.val());
    if (errorMessages) {
      flash(errorMessages.join('\n'), 'Invalid Tweet (>_<)');
    } else {
      submitNewTweet(newTweet.form.serialize(), () => {
        newTweet.main.slideUp();
        newTweet.content.val('').trigger('change');
        refreshTweets();
      });
    }
    return false;
  });


  /** Set the compose button behaviour */
  $('.compose').on('click', () => {
    newTweet.main.slideToggle();
    newTweet.content.focus();
  });

  /** Get the initial tweet data from the server */
  $(document).bind('user:login', () => refreshTweets());
  $(document).bind('user:logout', () => refreshTweets());
  refreshTweets();
});
