exports.getLogin = (req, res) => {
  res.render("auth/login", {
    //rsons
    title: "Login Page",
    currentPage: "login-page",
    editing: false,
    isLoggedIn: req.cookies.isLoggedIn,
  });
};

exports.postLogin = (req, res) => {
  res.cookie("isLoggedIn", true, { maxAge: 15 * 1000 });
  res.redirect("/home");
};

exports.postLogout = (req, res) => {
  res.cookie("isLoggedIn", false);
  res.redirect("/login");
};
