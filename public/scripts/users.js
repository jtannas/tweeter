"option strict";

const applyUserFunctions = function applyCallbacksToUserDialogs(loginDialog, registerDialog, logoutButton) {
  loginDialog.cancelButton.on("click", () => { loginDialog.main[0].close(); });

  function toggleUserButtons() {
    const session = getCookie("session");
    console.log(session);
    loginDialog.showButton.toggle(session === null);
    registerDialog.showButton.toggle(session === null);
    logoutButton.toggle(session !== null);
  }

  loginDialog.form.on("submit", () => {
    loginUser(loginDialog.form.serialize(), () => {
      loginDialog.main[0].close();
      loginDialog.form[0].reset();
      toggleUserButtons();
    });
  });

  registerDialog.cancelButton.on("click", () => { registerDialog.main[0].close(); });

  registerDialog.form.on("submit", () => {
    registerDialog.main[0].close();
    toggleUserButtons();
  });

  loginDialog.showButton.on('click', () => { loginDialog.main[0].showModal(); });
  registerDialog.showButton.on('click', () => { registerDialog.main[0].showModal(); });
  logoutButton.on('click', () => {
    logoutUser(() => {
      toggleUserButtons();
    });
  });

  toggleUserButtons();
};
