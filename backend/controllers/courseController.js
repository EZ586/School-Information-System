const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');


// Controller function for getting all students
const getCoursesID = async (req, res) => {
    const connection = await mysql.createConnection(config.db);
    const q = "SELECT courseID FROM school_info.courses";
    try {
      const [rows] = await connection.execute(q);
      console.log('Retrieved data:', rows);
      const idList = rows.map(obj => obj.courseID)
      return res.json(idList);
    } catch (err){ 
      console.error(`Error occurred while getting data: ${err.message}`, err);
      return 'error getting data';
    }
};

// Controller function for creating a course and providing created id
const insert_course = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  let idVal;
  try {
    // create query 
    const q = "INSERT INTO courses (max_capacity, profID, course_name) VALUES (?, ?, ?)";
    const v = "SELECT * FROM courses ORDER BY courseID DESC LIMIT 1";
    // get values for parents
    const values = [
      req.body.max_capacity,
      req.body.profID,
      req.body.course_name,
    ];
    //submit student
    await connection.execute(q, values)
    // get most recent id
    const [resp] = await connection.execute(v, values)
    idVal = resp[0].courseID;
  } catch(err) {
    console.error(`Error occurred while creating course: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return 'error creating course';
  }
  // return id value of inserted course
  return res.json(idVal);
};

// provide cours info
const course_info = async (req, res) => {
    
  const connection = await mysql.createConnection(config.db);
  try {
    console.log("Req obj: " + JSON.stringify(req.body))
    const courseID = req.body.courseIDList;
    const commaSeparatedString = courseID.join(',');
    console.log(commaSeparatedString)
    const courseInfos = await connection.execute(
      `SELECT * FROM courses WHERE courseID IN (${commaSeparatedString})`
    );
    console.log(courseInfos[0])
    return res.json(courseInfos[0])
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return res.json([]);;
  }
};

// updated course info
const edit_course = async (req, res) => {

  const connection = await mysql.createConnection(config.db);
  let infoCourse = 0;

  try {
    const values = [
      req.body.max_capacity,
      req.body.profID,
      req.body.course_name,
      req.body.courseID
    ];
    const query = 'UPDATE courses SET max_capacity = ?, profID = ?, course_name = ? WHERE courseID = ?'
    const [result] = await connection.execute(query, values);
    console.log(JSON.stringify(result))
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return res.json('error updating course');;
  }

  return res.json("Edit Course Succesful!");
};

// Controller function for creating a course and providing created id
const register_course = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  try {
    // create query 
    const q = "INSERT INTO `student-course-link` (student_id, course_id) VALUES (?, ?)";
    const v = "UPDATE courses SET curr_capacity = curr_capacity + 1 WHERE courseID = ?";
    // get values for registration
    const values = [
      req.body.student_id,
      req.body.course_id,
    ];
    //submit student
    await connection.execute(q, values)
    await connection.execute(v, [req.body.course_id])
  } catch(err) {
    console.error(`Error occurred while registering course: ${err.message}`, err);
    connection.rollback();
    console.info('Rollback successful');
    return res.json("error creating course");
  }
  // return id value of inserted course
  return res.json("Course Registered Succesfully");
};

// gets course ids of registered courses
const getRegistered = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const q = "SELECT course_id FROM `student-course-link` WHERE student_id = ?";
  const studentID = req.body.studentID;
  try {
    const [rows] = await connection.execute(q, [studentID]);
    console.log('Retrieved data:', rows);
    const idList = rows.map(obj => obj.course_id)
    return res.json(idList);
  } catch (err){ 
    console.error(`Error occurred while getting data: ${err.message}`, err);
    return 'error getting data';
  }
};

// gets course ids of registered courses
const deleteRegistered = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const q = "DELETE FROM `student-course-link` WHERE student_id = ? AND course_id = ?";
  const v = "UPDATE courses SET curr_capacity = curr_capacity - 1 WHERE courseID = ?";
  const studentID = req.query.student_id;
  const courseID = req.query.course_id;
  console.log("Received data: " + JSON.stringify(req.body))
  console.log("StudentID Received: " + req.body.student_id)
  console.log("courseID Received: " + req.body.course_id)
  try {
    await connection.execute(q, [studentID, courseID]);
    await connection.execute(v, [courseID]);
    return res.json('Delete Succesful!');
  } catch (err){ 
    console.error(`Error occurred while getting data: ${err.message}`, err);
    return res.json('Delete Failed!');
  }
};
  
// check capacity of course
const capCheck = async (req, res) => {
  const connection = await mysql.createConnection(config.db);
  const q = "SELECT curr_capacity, max_capacity FROM courses WHERE courseID = ?";

  const courseID = req.body.course_id;

  try {
    [dataList] = await connection.execute(q, [courseID]);
    const curr_capacity = dataList[0].curr_capacity;
    const max_capacity = dataList[0].max_capacity;
    console.log("Max Capacity: " + max_capacity)
    console.log("Curr Capacity: " + curr_capacity)
    return res.json(curr_capacity < max_capacity);
  } catch (err){ 
    console.error(`Error occurred while getting data: ${err.message}`, err);
    return res.json('Check Failed!');
  }
};
  
// Export the controller functions
module.exports = {
  getCoursesID,
  insert_course,
  course_info,
  edit_course,
  register_course,
  getRegistered,
  deleteRegistered,
  capCheck
};