var mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "register.web",
  password: "Web@here1",
  database: "school_info"
});

// Connect to the database
db.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Database connected successfully');
  });
  
  // Export the database connection
  module.exports = {
    db: {
      host: 'localhost',
      user: 'register.web',
      password: 'Web@here1',
      database: 'school_info',
    },
  };