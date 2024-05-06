const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

const sqlite3 = require("sqlite3").verbose();
const expressValidator = require("express-validator");
const passport = require("passport");
const expressSession = require("express-session");
// create server and setsup
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.json());

//handle static files
app.use(express.static("public"));

/*************************************************
 * Databse setting up
 **********************************************/

// Function to initialize database tables
function initializeDatabase() {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      isAdmin BOOLEAN NOT NULL DEFAULT 0
    );
  )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log("Table 'users' ensured.");
    }
  );
}
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const db = new sqlite3.Database(
  "./db/xssProject.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Connected to the xssProject.db database.");
    initializeDatabase();
  }
);
const routers = require("./router.js");

//router handlers and MW
app.use("/", routers);

//sets up local variable
app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  if (res.locals.loggedIn && res.locals.currentUser.isAdmin) {
    res.locals.status = "Admin";
  } else if (res.locals.loggedIn) {
    res.locals.status = "User";
    next();
  }
});

// create server and setsup
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);

module.exports = db;
