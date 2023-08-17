var mysql = require('mysql');
const express = require('express')
const app = express()

app.post('/api/data', (req, res) => {
  res.send('POST request to homepage')
});

var con = mysql.createConnection({
  host: "localhost",
  user: "register.web",
  password: "Web@here1",
  database: "mydb"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO accounts (Username, Password) VALUES ('John12', 'testestes')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Operation Succesful");
//   });
// });

// Start the server
const port = 4001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});