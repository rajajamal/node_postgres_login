const express = require("express");
const app = express();
const { pool } = require("./dbConfig");
const PORT = process.env.PORT || 4000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/users/register", (req, res) => {
  res.render("register");
});

app.get("/users/login", (req, res) => {
  res.render("login");
});

app.get("/users/dashboard", (req, res) => {
  res.render("dashboard", { user: "raja" });
});

app.post("/users/register", (req, res) => {
  let { name, email, password, password2 } = req.body;

  console.log({
    name,
    email,
    password,
    password2,
  });

  let errros = [];

  if (!name || !email || !password || !password2) {
    errros.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errros.push({ message: "Password do not macth " });
  }

  if (errros.length > 0) {
    res.render("register", { errros });
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
