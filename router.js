const express = require("express");
const app = express.Router();
const usersController = require("./db/users");

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

app.post("/logIn", usersController.validate);
app.post(
  "/signUp",
  usersController.addUser,
  usersController.logInPage,
  usersController.showAll
);

module.exports = app;
