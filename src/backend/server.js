const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuid } = require("uuid");
const sessions = require("./sessions");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../../public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/create", (req, res) => {
  const { login, pass, email } = req.body;
  const values = [
    login,
    pass,
    email,
    "https://kinopoiskapiunofficial.tech/images/posters/kp/1402937.jpg",
  ];
  const sql =
    "INSERT INTO `info`(`login`, `pass`, `email`, `avatarUrl`) VALUES (?)";
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
  const user = sessions[id].login;
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, user, (err, result) => {
    if (err) return res.json({ Error: "Error singup query" });
    else if (result == "") return res.json("Failed");
    else if (sessions[id].pass == result[0].pass) return res.json("Success");
    else return res.json("Failed");
  });
});

app.post("/getUser", (req, res) => {
  const { id } = req.body;
  const user = sessions[id].login;
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, user, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/updateAvatarFile", upload.single("file"), (req, res) => {
  const { id } = req.body;
  const file = req.file.filename;
  const user = sessions[id].login;
  const sql =
    "UPDATE `info` SET `avatarUrl`='" +
    file +
    "' WHERE `login` LIKE '" +
    user +
    "'";
  try {
    con.query(sql, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/updateAvatarUrl", (req, res) => {
  const { id, url } = req.body;
  const user = sessions[id].login;
  const sql =
    "UPDATE `info` SET `avatarUrl`='" +
    url +
    "' WHERE `login` LIKE '" +
    user +
    "'";
  try {
    con.query(sql, (err, result) => {
      if (err) return res.json(err);
      return res.json(result);
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/changeLogin", (req, res) => {
  const { id, newLogin } = req.body;
  const user = sessions[id].login;
  const sql =
    "UPDATE `info` SET `login`='" +
    newLogin +
    "' WHERE `login` LIKE '" +
    user +
    "'";
  try {
    con.query(sql, (err, result) => {
      if (err) return res.json(err);
    });
    con.query(
      "SELECT * FROM `info` WHERE `login` LIKE (?)",
      newLogin,
      (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.post("/loginVerify", (req, res) => {
  const { login } = req.body;
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, login, (err, result) => {
    if (result == "") return res.json(Boolean(1));
    else return res.json(Boolean(0));
  });
});

app.post("/emailVerify", (req, res) => {
  const { email } = req.body;
  const sql = "SELECT * FROM `info` WHERE `email` LIKE (?)";
  con.query(sql, email, (err, result) => {
    if (result == "") return res.json(Boolean(1));
    else return res.json(Boolean(0));
  });
});

app.post("/changeEmail", (req, res) => {
  const { id, newEmail } = req.body;
  const user = sessions[id].login;
  const sql =
    "UPDATE `info` SET `email`='" +
    newEmail +
    "' WHERE `login` LIKE '" +
    user +
    "'";
  try {
    con.query(sql, (err, result) => {
      if (err) return res.json(err);
    });
    con.query(
      "SELECT * FROM `info` WHERE `login` LIKE (?)",
      newEmail,
      (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.post("/verifyPassword", (req, res) => {
  const { login, pass } = req.body;
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)";
  con.query(sql, login, (err, result) => {
    return res.json(result[0].pass == pass);
  });
});

app.post("/changePassword", (req, res) => {
  const { id, pass } = req.body;
  const user = sessions[id].login;
  const sql =
    "UPDATE `info` SET `pass`='" +
    pass +
    "' WHERE `login` LIKE '" +
    user +
    "'";
  try {
    con.query(sql, (err, result) => {
      if (err) return res.json(err);
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/getInLike", (req, res) => {
  const { id } = req.body
  const user = sessions[id].login;
  const sql = "SELECT * FROM `info` WHERE `login` LIKE (?)"
  con.query(sql, user, (err, result)=>{
    if(err) return res.json({Error: "Failled"})
    return res.json(JSON.parse(result[0].inLike))
  })
})

app.post("/setInLike", (req, res) => {
  const { id, films } = req.body
  const user = sessions[id].login;
  const filmsJson = JSON.stringify(films)
  const sql =
  "UPDATE `info` SET `inLike`='" +
  filmsJson +
  "' WHERE `login` LIKE '" +
  user +
  "'";
try {
  con.query(sql, (err, result) => {
    if (err) return res.json(err);
  });
} catch (e) {
  console.log(e);
}
})

try {
  app.listen(4000, () => {
    console.log("Server is running");
  });
} catch (e) {
  console.log(e);
}
