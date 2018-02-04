"option strict";

const applyUserFunctions = function applyCallbacksToUserDialogs(loginDialog, registerDialog, logoutButton) {

  loginDialog.showButton.on('click', () => { loginDialog.main[0].showModal(); });
  loginDialog.form.on("submit", () => {
    loginUser(loginDialog.form.serialize(), (data, textStatus, xhr) => {
      loginDialog.form.trigger('user:login');
      loginDialog.form[0].reset();
      loginDialog.main[0].close();
    });
  });
  loginDialog.cancelButton.on("click", () => { loginDialog.main[0].close(); });
  $(document).bind('user:logout', () => loginDialog.showButton.show());
  $(document).bind('user:login', () => loginDialog.showButton.hide());


  registerDialog.showButton.on('click', () => { registerDialog.main[0].showModal(); });
  registerDialog.form.on("submit", () => {
    registerUser(registerDialog.form.serialize(), (data, textStatus, xhr) => {
      registerDialog.form.trigger('user:register').trigger('user:login');
      registerDialog.form[0].reset();
      registerDialog.main[0].close();
    });
  });
  registerDialog.cancelButton.on("click", () => { registerDialog.main[0].close(); });
  $(document).bind('user:logout', () => registerDialog.showButton.show());
  $(document).bind('user:login', () => registerDialog.showButton.hide());


  logoutButton.on('click', (data, textStatus, xhr) => {
    logoutUser(() => {
      logoutButton.trigger('user:logout');
    });
  });
  $(document).bind('user:logout', () => logoutButton.hide());
  $(document).bind('user:login', () => logoutButton.show());
};
