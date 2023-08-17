const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');


// Controller function for getting all students
const getTeacher = async (req, res) => {
    const connection = await mysql.createConnection(config.db);
    const q = "SELECT * FROM school_info.professor";
    try {
      const [rows] = await connection.execute(q);
      console.log('Retrieved teacher data:', rows);
      return res.json(rows);
    } catch (err){ 
      console.error(`Error occurred while getting teacher data: ${err.message}`, err);
      return 'error getting teacher';
    }
};

// Controller function for creating a student
const insert_teacher = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  try {
    // create query 
    const q = "INSERT INTO professor (username, password, first_name, last_name) VALUES (?, ?, ?, ?)";
    // get values for parents
    const values = [
      req.body.username,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
    ];
    //submit student
    await connection.execute(q, values)
  } catch(err) {
    console.error(`Error occurred while creating teacher: ${err.message}`, err);
    return 'error creating teacher';
  }
  return res.json("teacher has been created");
};

// provide password for checking
const teacher_pass = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const username = req.body.username;
  let passTeacher;
  try {
    const [teacherPasswords] = await connection.execute(
      'SELECT password FROM professor WHERE username = ?',
      [username]
    );
    if (teacherPasswords.length > 0) {
      // Password Exists
      passTeacher = teacherPasswords[0].password;
    } else {
      // Address does not exist, insert it into the database
      console.log("No Password!??");
      return "No PASSWORD";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return 'error finding password';
  }
  return res.json(passTeacher);
};

// provide admin id
const teacher_info = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  
  const username = req.body.username;
  let infoTeacher = 0;
  try {

    const [teacherInfos] = await connection.execute(
      'SELECT * FROM professor WHERE username = ?',
      [username]
    );
    if (teacherInfos.length > 0) {
      // username exists
      infoTeacher = teacherInfos[0];
    } else {
      // no username case
      console.log("No Info!??");
      return "No Info";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return 'error getting info';
  }
  console.log(infoTeacher)
  return res.json(infoTeacher);
};
  
// Export the controller functions
module.exports = {
  insert_teacher,
  teacher_pass,
  getTeacher,
  teacher_info
};