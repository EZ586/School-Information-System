const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');


// Controller function for getting all students
const getParent = async (req, res) => {
    const connection = await mysql.createConnection(config.db);
    const q = "SELECT * FROM school_info.parents";
    try {
      const [rows] = await connection.execute(q);
      console.log('Retrieved parents data:', rows);
      return res.json(rows);
    } catch (err){ 
      console.error(`Error occurred while creating order: ${err.message}`, err);
      return 'error getting parent';
    }
};

// Controller function for creating a student
const insert_parent = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  try {
    // create query 
    const q = "INSERT INTO parents (username, password, first_name, last_name) VALUES (?, ?, ?, ?)";
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
    console.error(`Error occurred while creating parent: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating parent';
  }
  return res.json("parent has been created");
};

// provide password for checking
const parent_pass = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const username = req.body.username;
  let passParent;
  try {
    const [parentPasswords] = await connection.execute(
      'SELECT password FROM parents WHERE username = ?',
      [username]
    );
    if (parentPasswords.length > 0) {
      // Password Exists
      passParent = parentPasswords[0].password;
    } else {
      // Address does not exist, insert it into the database
      console.log("No Password!??");
      return "No PASSWORD";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return 'error finding password';
  }
  return res.json(passParent);
};

// provide parent id
const parent_info = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  
  const username = req.body.username;
  let infoAdmin = 0;
  try {

    const [adminInfos] = await connection.execute(
      'SELECT * FROM parents WHERE username = ?',
      [username]
    );
    if (adminInfos.length > 0) {
      // username exists
      infoAdmin = adminInfos[0];
    } else {
      // no username case
      console.log("No Info!??");
      return "No Info";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return 'error getting info';
  }
  console.log(infoAdmin)
  return res.json(infoAdmin);
};
  
// Controller function for creating a student
const insert_child = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  try {
    // create query 
    const q = "INSERT INTO `parent-student-link` (studentID, parentID) VALUES (?, ?)";
    // get values for child parent relationship
    const values = [
      req.body.studentID,
      req.body.parentID,
    ];
    //submit student
    await connection.execute(q, values)
  } catch(err) {
    console.error(`Error occurred: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating parent';
  }
  return res.json("operation successful!");
};

// Controller function for getting all students
const getChilds = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const q = "SELECT * FROM `school_info`.`parent-student-link`";
  try {
    const [rows] = await connection.execute(q);
    console.log('Retrieved data:', rows);
    return res.json(rows);
  } catch (err){ 
    console.error(`Error occurred while getting data: ${err.message}`, err);
    return 'error getting data';
  }
};

// Controller function for getting all students
const getParChilds = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const q = "SELECT studentID FROM `parent-student-link` WHERE parentID = ?";
  try {
    const [rows] = await connection.execute(q, [req.body.parentID]);
    const studList = rows.map((stud) => {
      return stud.studentID;
    })
    let finalList = []
    for (const stud of studList) {
      const q = "SELECT first_name, last_name FROM student WHERE studentID = ?";
      const [rows] = await connection.execute(q, [stud]);
      const name = rows[0].first_name + " " + rows[0].last_name;
      let objIns = {value: stud, label: name}
      finalList.push(objIns)
    }
    console.log('Retrieved data:', rows);
    return res.json(finalList);
  } catch (err){ 
    console.error(`Error occurred while getting data: ${err.message}`, err);
    return 'error getting data';
  }
};

// Export the controller functions
module.exports = {
  insert_parent,
  parent_pass,
  getParent,
  parent_info,
  insert_child,
  getChilds,
  getParChilds
};