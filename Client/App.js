var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");
const secret = "fullstack-login";

app.use(cors());

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "7-11all",
  port: 3306,
});

app.post("/register", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM users WHERE Email = ?",
    req.body.email,
    function (err,users) {
      if(users){
        res.json({status:"Email Have been used"})
      }else
      bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
        connection.execute(
          "INSERT INTO users (Fname,Lname,Email,Password,Role) VALUES (?,?,?, ?,'user')",
          [req.body.Fname, req.body.Lname, req.body.Email, hash],
          function (err, results, fields) {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            }
            res.json({ status: "ok" });
          }
        );
      });
    }
  );
});

app.post("/login", jsonParser, function (req, res, next) {
  console.log(req.body);
  console.log(req.body.email);
  connection.execute(
    "SELECT * FROM users WHERE Email = ?",
    [req.body.email],
    function (err, users, fields) {
      console.log(users);
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      if (users.length === 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }
      bcrypt.compare(
        req.body.password,
        users[0].Password,
        function (err, isLogin) {
          if (isLogin) {
            var token = jwt.sign({ email: users[0].email }, secret, {
              expiresIn: "1h",
            });
            res.json({ status: "ok", message: "login success", token });
          } else {
            res.json({ status: "error", message: "login failed" + err });
          }
        }
      );
    }
  );
});

app.post("/loginAdmin", jsonParser, function (req, res, next) {
  connection.execute(
    "SELECT * FROM admin WHERE email = ?",
    [req.body.email],
    function (err, users, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }

      if (users.length === 0) {
        res.json({ status: "error", message: "no user found" });
        return;
      }

      bcrypt.compare(
        req.body.password,
        users[0].password,
        function (err, isLogin) {
          if (isLogin) {
            var token = jwt.sign({ email: users[0].email }, secret, {
              expiresIn: "1h",
            });
            res.json({ status: "ok", message: "login success", token });
          } else {
            res.json({ status: "error", message: "login failed" });
          }
        }
      );
    }
  );
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.listen(4000, jsonParser, function () {
  console.log("CORS-enabled web server listening on port 4000");
});
