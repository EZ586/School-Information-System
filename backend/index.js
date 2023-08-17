var mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "register.web",
  password: "Web@here1",
  database: "mydb"
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM accounts";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log("\nData Here!");
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO accounts (`Username`, `Password`) VALUES (?)";
  console.log("Here");
  const values = [
    req.body.Username,
    req.body.Password
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    console.log(req.body);
    return res.json("book has been created");
  });
});


db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "INSERT INTO accounts (Username, Password) VALUES ('Sammy', 'testestes')";
  // con.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Operation Succesful");
  // });
});

// Start the server
const port = 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});