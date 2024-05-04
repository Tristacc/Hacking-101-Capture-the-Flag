const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

const sqlite3 = require("sqlite3").verbose();
// const routers = require("./router.js");

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
    `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL
  )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log("Table 'messages' ensured.");
    }
  );
}

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

// create server and setsup
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);

module.exports = db;
