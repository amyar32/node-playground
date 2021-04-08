const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // isLoggedIn = req.get("Cookie").split("=")[1];
  console.log(req.session);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // dengan mengatur cookie seperti ini, maka client di dalam browsernya bisa mengedit secara manual dan itu lumayan kurang bagus lah
  // contoh ya dengan mengedit secara manual, maka status login akan dapat diubah tanpa mengisi login form

  // // protect from client-side scripting
  // res.setHeader("set-Cookie", "isLoggedIn = true; HttpOnly");

  // // res.setHeader("set-Cookie", "isLoggedIn = true; Max-Age=10");
  User.findById("606a0cdc5e9aa12fb4ad243d")
    .then((user) => {
      req.session.user = user;
      console.log(user);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    console.log("Session Destroyed!");
    res.redirect("/");
  });
};
