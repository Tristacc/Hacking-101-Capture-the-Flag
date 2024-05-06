const express = require("express");
const app = express.Router();
const usersController = require("./db/users");
const expressSession = require("express-session");

app.get("/", (req, res) => {
  res.render("problemOne");
});
app.get("/gkdojmrjeio879", (req, res) => {
  res.render("problemTwo");
});

app.get("/djfoei89788", (req, res) => {
  res.render("problemThree");
});

app.get("/signUp", (req, res) => {
  res.render("signUp");
});

app.get("/logIn", (req, res) => {
  if (!req.session.user) {
    // Redirect to login if not logged in
    res.redirect("/djfoei89788");
  } else {
    res.render("problemThree-mainpage");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.error(err);
    }
    res.redirect("/djfoei89788"); // Redirect to login page
  });
});

app.post("/logIn", usersController.verifyID, usersController.redirectPage);
app.post(
  "/signUp",
  usersController.addUser,
  usersController.showAll,
  usersController.redirectPage
);

module.exports = app;
