const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const sessions = require("./sessions");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});

con.connect(function (err) {
  if (err) {
    console.error("Error connecting to database: " + err.stack);
    return;
  }
  console.log("Connected to database as id " + con.threadId);
});

app.post("/create", (req, res) => {
    const { login, pass, email } = req.body;
  const values = [login, pass, email, "https://kinopoiskapiunofficial.tech/images/posters/kp/1402937.jpg"];
  const sql = "INSERT INTO `info`(`login`, `pass`, `email`, `avatarUrl`) VALUES (?)";
  con.query(sql, [values], (err, result) => {
    const sessionId = uuid();
    sessions[sessionId] = { login, pass };
    if (err) return res.json({ Error: "Error singup query" });
    return res.json(sessionId);
  });
});

app.post("/emailValid", (req, res) => {
  const sql = "SELECT * FROM `info` WHERE `email` LIKE (?)";
  con.query(sql, req.body.email, (err, result) => {
    if (err) return res.json({ Error: "Error singup query" });
    return res.json(`${result == ""}`);
  });
});

app.post("/login", (req, res) => {
  const { login, pass } = req.body;
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, login, (err, result) => {
    const sessionId = uuid();
    sessions[sessionId] = { login, pass };
    if (err) return res.json({ Error: "Error singup query" });
    if (result == "") return res.json("None");
    else if (result[0].pass == pass) return res.json(sessionId);
    else return res.json("Failed");
  });
});

app.post("/test", (req, res) => {
  const { id } = req.body;
  const user = sessions[id].login
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, user, (err, result) => {
    if (err) return res.json({ Error: "Error singup query" });
    else if (result == "") return res.json("Failed");
    else if (sessions[id].pass == result[0].pass) return res.json("Success");
    else return res.json("Failed");
  });
});

app.post("/getUser", (req, res) => {
  const {id} = req.body
  const user = sessions[id].login
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, user, (err, result) => {
    if(err) return res.json(err)
    return res.json(result)
  });
});

try {
  app.listen(4000, () => {
    console.log("Server is running");
  });
} catch (e) {
  console.log(e);
}
