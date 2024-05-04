//this file contain user's module and the controller for different db actions

/*************************************************
 * Open the Databse
 **********************************************/
const sqlite3 = require("sqlite3").verbose();
const dbPath = "../db/xssProject.db";
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected successfully to the database.");
});

function addUser(req, res, next) {
  console.log("adduser");
  next();
}

// Export all functions
module.exports = {
  addUser,
};
