$(document).ready(() => {
  $('dialog').on('click', '.close', function(event) { $(this).parent()[0].close(); });
});

const dialog = function renderDialogMessage(message, title = 'Hey!') {
  const dialog = $('.flash');
  dialog.find('h1').text(title);
  dialog.find('p').text(message);
  dialog[0].showModal();
};
