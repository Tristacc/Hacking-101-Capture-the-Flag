//this file contain user's module and the controller for different db actions

/*************************************************
 * Open the Databse
 **********************************************/
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const filename = "./xssProject.db";
const dbPath = path.resolve(__dirname, filename);
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error("Failed to connect to the database: " + err.message);
    return;
  }
  console.log("Connected successfully to the database.");
});

function validate(req, res, next) {
  console.log("check user");
  next();
}

function addUser(req, res, next) {
  console.log(req.body);
  let sql = `INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)`;
  db.run(
    sql,
    [req.body.name, req.body.email, req.body.password, "false"], // ensure req.body.namee typo is corrected to req.body.name
    function (err) {
      if (err) {
        console.error("Error adding new user:", err.message);
        next(err);
        return;
      }
      console.log("Add new user successfully");
      next();
    }
  );
}

function showAll(req, res, next) {
  let sql = `SELECT * FROM users`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err);
      next(err);
      return;
    }
    console.log("All Data:", rows);
    next();
  });
}

function logInPage(req, res) {
  res.render("problemThree");
}

// Export all functions
module.exports = {
  addUser,
  validate,
  logInPage,
  showAll,
};
