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

app.get("/addUser", usersController.addUser);

module.exports = app;
