const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');


// Controller function for getting all students
const getStudent = async (req, res) => {

    const connection = await mysql.createConnection(config.db);
    await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
    console.log('Finished setting the isolation level to read committed');
    //set wait timeout and lock wait timeout as per need.
    await connection.beginTransaction();
    console.log('Transaction started!');
    const q = "SELECT * FROM school_info.student";

    try {

      const [rows, fields] = await connection.execute(q);
      console.log('Retrieved student data:', rows);
      console.log('Fields:', fields);
      await connection.commit();
      console.log('Transaction committed successfully!');
      
      return res.json(rows);

    } catch (err){ 

      console.error(`Error occurred while creating order: ${err.message}`, err);
      connection.rollback();
      console.info('Rollback successful');
      return 'error creating order';S

    } finally {
      await connection.commit();
      connection.end();
    }
};

// Controller function for creating a student
const create_Student = (req, res) => {
  const q = "INSERT INTO student (`studentUser`, `studentPass`, 'first_name', 'last_name', 'birthdate', 'addressID') VALUES (?)";
  console.log("Here");
  const values = [
    req.body.username,
    req.body.password,
    req.body.first_name,
    req.body.last_name,
    req.body.birthdate,
    req.body.address
  ];
  console.log(req.body.first_name);
  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    console.log(req.body);
    return res.json("student has been created");
  });
}

// Controller function for creating a student
const insert_Student = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
 
  const values = [
    req.body.username,
    req.body.password,
    req.body.first_name,
    req.body.last_name,
    req.body.birthdate,
  ];

  const { st_address, city, state, zip, ...studentData } = req.body;

  try {

    // Check if the address already exists
    const [existingAddress] = await connection.execute(
      'SELECT addressID FROM address WHERE st_address = ? AND city = ? AND state = ? AND zip = ?',
      [st_address, city, state, zip]
    );
    console.log("HERE")
    console.log(existingAddress)

    let addressId = 0;
    if (existingAddress.length > 0) {
      // Address already exists, use the existing ID
      addressId = existingAddress[0].addressID;
      console.log(addressId)
    } else {
      // Address does not exist, insert it into the database
      const [insertedAddress] = await connection.execute(
        'INSERT INTO address (st_address, city, state, zip) VALUES (?, ?, ?, ?)',
        [st_address, city, state, zip]
      );
      addressId = insertedAddress.insertId;
    }
    // create query 
    const q = "INSERT INTO student (studentUser, studentPass, first_name, last_name, birthdate, addressID) VALUES (?, ?, ?, ?, ?, ?)";
    console.log(addressId);
    // create values list with addressID
    const values = [
      req.body.username,
      req.body.password,
      req.body.first_name,
      req.body.last_name,
      req.body.birthdate,
      addressId
    ];
    //submit student
    await connection.execute(q, values)
    console.log(`student added`);
    console.log("The student:\n" + JSON.stringify(values));
    await connection.commit();
    console.log(`commited!`);
  } catch(err) {
    console.error(`Error occurred while creating order: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating order';
  }
  return res.json("student has been created");
};

// provide password for checking
const stud_pass = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
 
  const studUser = req.body.username;
  let passStud = 0;
  try {

    // Check if the address already exists
    const [studPasswords] = await connection.execute(
      'SELECT studentPass FROM student WHERE studentUser = ?',
      [studUser]
    );
    console.log("HERE")
    console.log(studUser)
    passStud = studPasswords;
    let existingPass = 0;
    if (studPasswords.length > 0) {
      // Password Exists
      existingPass = studPasswords[0].studentPass;
      console.log(existingPass)
    } else {
      // No Password Case
      console.log("No Password!??");
      return "No PASSWORD";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating order';
  }
  return res.json(passStud[0].studentPass);
};

// provide student id
const stud_info = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  await connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED');
  console.log('Finished setting the isolation level to read committed');
  //set wait timeout and lock wait timeout as per need.
  await connection.beginTransaction();
 
  const studUser = req.body.username;
  let infoStud = 0;
  try {

    // Check if the address already exists
    const [studInfos] = await connection.execute(
      'SELECT * FROM student WHERE studentUser = ?',
      [studUser]
    );
    console.log("HERE")
    console.log(studInfos)
    console.log(studUser)
    infoStud = studInfos;
    if (studInfos.length > 0) {
      // id Exists
      infoStud = studInfos[0];
    } else {
      // no id case
      console.log("No Info!??");
      return "No Info";
    }
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error getting info';
  }
  return res.json(infoStud);
};

const stud_Test = (req, res) => {
  res.json("Some Test Here!");
}

// Controller function for creating a course and providing created id
const getStudGrades = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  try {
    // create query 
    const q = "SELECT * FROM `student-course-link` WHERE student_id = ?";
    // get course ids
    const [result] = await connection.execute(q, [req.body.student_id])
    const courseIdList = result.map((course) => {
      return course.course_id;
    })
    let courseGrade = []
    for (const course of courseIdList) {
      // get course grades
      const v = "SELECT courseID, assignments, hw, exams FROM grades WHERE studentID = ? and courseID = ?";
      const [grades] = await connection.execute(v, [req.body.student_id, course])
      // get course name
      const z = "SELECT course_name FROM courses WHERE courseID = ?";
      const [courseName] = await connection.execute(z, [course])
      console.log("Grades: " + JSON.stringify(grades))
      const courseGradeObj = {"courseID": course, ...grades[0], ...courseName[0]}
      courseGrade.push(courseGradeObj)
    }
    return res.json(courseGrade);
  } catch(err) {
    console.error(`Error occurred while registering course: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return res.json("error creating course");
  }
};

  
// Export the controller functions
module.exports = {
  getStudent,
  create_Student,
  stud_Test,
  insert_Student,
  stud_pass,
  stud_info,
  getStudGrades
};