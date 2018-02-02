const flashFunctionFactory = function createFlashFunctionUsingInjectedElements(dialogElements) {
  dialogElements.closeButton.on('click', () => dialogElements.main[0].close());

  const flash = function renderDialogMessage(message, title = 'Hey!') {
    dialogElements.title.text(title);
    dialogElements.message.text(message);
    dialogElements.main[0].showModal();
  };
  return flash;
};
