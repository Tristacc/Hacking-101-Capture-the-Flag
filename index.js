const express = require("express");
const layouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

// create server and setsup
app.set("view engine", "ejs");
app.use(layouts);
app.use(express.json());

//handle static files
app.use(express.static("public"));

//router handlers and MW
app.get("/", (req, res) => {
  res.render("problemOne");
});

// create server and setsup
app.listen(port, () =>
  console.log(`The server is running on http://localhost:${port}`)
);
