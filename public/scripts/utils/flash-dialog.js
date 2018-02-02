/**
 * Module responsible for creating dialog boxes to the user.
 */

/** To isolate the function definition from the DOM definition, a factory function is used */
const flashFunctionFactory = function createFlashFunctionUsingInjectedElements(dialogElements) {
  dialogElements.closeButton.on('click', () => dialogElements.main[0].close());

  const flash = function renderDialogMessage(message, title = 'Hey!') {
    dialogElements.title.text(title);
    dialogElements.message.text(message);
    dialogElements.main[0].showModal();
  };
  return flash;
};
