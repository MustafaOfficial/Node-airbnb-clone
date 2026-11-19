exports.getLogin = (req, res) => {
  res.render("auth/login", {
    //rsons
    title: "Login Page",
    currentPage: "login-page",
    editing: false,
  
  });
};

exports.postLogin = (req, res) => {
  // res.cookie("isLoggedIn", true, { maxAge: 15 * 1000 });
  req.session.isLoggedIn = true;
  req.session.save(() => res.redirect("/home"));
};

exports.postLogout = (req, res) => {
  // res.cookie("isLoggedIn", false);?
  req.session.destroy(() => res.redirect("/login"));
};
