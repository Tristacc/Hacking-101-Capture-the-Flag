const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
const expressSession = require("express-session");
const puppeteer = require("puppeteer");
// create server and setsup
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.json());

//handle static files
app.use(express.static("public"));

//********************************//
//******** Data base setUp *******//
//********************************//

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
      insertDefaultAdmin();
      console.log("Table 'users' ensured.");
    }
  );
}
function insertDefaultAdmin() {
  const sql = `INSERT OR IGNORE INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`;
  db.run(sql, ["admin", "admin@email.com", "admin", true], function (err) {
    if (err) {
      console.error("Error inserting default admin:", err.message);
      return;
    }
    if (this.changes > 0) {
      console.log("Default admin user added.");
    } else {
      console.log("Default admin user already exists.");
    }
  });
}

//********************************//
//*******  Testing block   *******//
//********************************//
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Go to the login page
  await page.goto("http://localhost:3000/login", { waitUntil: "networkidle0" });

  // Assuming form fields are named appropriately
  await page.type("[name=email]", "admin@email.com");
  await page.type("[name=password]", "admin");
  await page.click("[type=submit]");

  // Check cookies set by the server
  const cookies = await page.cookies();
  console.log("Cookies set:", cookies);
  await page.goto("http://localhost:3000/logout");
})();

//********************************//
//***  cookie sets up         ****//
//********************************//

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
    SameSite: true,
  })
);

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

//sets up local variable
app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.status = req.session.user.admin;

    console.log("here" + res.locals.status);
  }
  next();
});
//router handlers and MW
app.use("/", routers);
// create server and setsup
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);

module.exports = db;
