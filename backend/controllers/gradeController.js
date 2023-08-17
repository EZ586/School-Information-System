const db = require("../database.js");
const config = db;
const mysql = require('mysql2/promise');


// Controller function for getting all grades for a teacher
const getGrades = async (req, res) => {
    const connection = await mysql.createConnection(config.db);
    
    try {

      // get get course information relating to profID
      const q = "SELECT courseID, course_name FROM school_info.courses WHERE profID = ?";
      const profID = req.body.prof_ID;
      const [courses] = await connection.execute(q, [profID]);
      console.log("------------------------------")
      console.log("courses: \n" + JSON.stringify(courses) + "\n")
      // get courseID list
      const courseIDs = courses.map((course) => {
        return course.courseID;
      })
      console.log("courseIDs: \n" + courseIDs+ "\n")
      // get students for each course
      const commaSeparatedString = courseIDs.join(',');
      const [courseInfos] = await connection.execute(
        `SELECT course_id, student_id FROM \`student-course-link\` WHERE course_id IN (${commaSeparatedString})`
      );
      console.log("courseInfos: \n" + JSON.stringify(courseInfos)+ "\n")

      // map students to course
      let mappedStud = {}
      let visitedCourse = []
      courseInfos.forEach((link) => {
        if (visitedCourse.includes(link.course_id)) {
          mappedStud[link.course_id].push(link.student_id);
        } else {
          visitedCourse.push(link.course_id)
          mappedStud = {...mappedStud, [link.course_id]: [link.student_id]}
        }
      })
      console.log("mappedStud: \n" + JSON.stringify(mappedStud) + "\n")
      let finalList = []
      let studentsToInsert = [];
      // get student grades 
      for (const course of visitedCourse) {
        // get course name
        const getCourseName = "SELECT course_name FROM school_info.courses WHERE courseID = ?";
        const [courseName] = await connection.execute(getCourseName, [course]);
        let courseObj = {courseID: course, courseName: courseName[0].course_name, courseStud: []};
        // loop through each student
        for (const stud of mappedStud[course]) {
          console.log(stud)
          // get Grade Info
          const query = "SELECT studentID, assignments, hw, exams FROM school_info.grades WHERE courseID = ? AND studentID = ?";
          const [grades] = await connection.execute(query, [course, stud]);
          // get student name
          const query2 = "SELECT first_name, last_name FROM school_info.student WHERE studentID = ?";
          const [name] = await connection.execute(query2, [stud]);
          console.log("Name: \n" + JSON.stringify(name))
          const fullName = name[0].first_name + " " + name[0].last_name
          console.log("fullName: \n" + fullName)
          if (grades.length === 0) {
            const queryInputs = [stud, course, 0, 0, 0]
            const queryINS = "INSERT INTO school_info.grades (studentID, courseID, assignments, hw, exams) VALUES (?, ?, ?, ?, ?)";
            const [result] = await connection.execute(queryINS, queryInputs);
            console.log("result: \n" + JSON.stringify(result))
            console.log("HAHA")
            courseObj["courseStud"].push({studentID: stud, assignments: 0, hw: 0, exams: 0, stud_name: fullName})
          } else {
            console.log("Grades: \n" + JSON.stringify(grades))
            courseObj["courseStud"].push({...grades[0], stud_name: fullName})
          }
          console.log("Course Grades: \n" + JSON.stringify(courseObj))
        }
        finalList.push(courseObj)
      }
      console.log("finalList: \n" + JSON.stringify(finalList))
      return res.json(finalList);
    } catch (err){ 
      console.error(`Error occurred while getting data: ${err.message}`, err);
      return 'error getting data';
    }
};

// provide cours info
const edit_grade = async (req, res) => {

  const connection = await mysql.createConnection(config.db);

  try {
    const identifier = [
      req.body.courseID,
      req.body.studentID
    ]
    
    const query0 = 'SELECT gradeKey FROM school_info.grades WHERE courseID = ? and studentID = ?'
    const [gradeID] = await connection.execute(query0, identifier);
    const usedID = gradeID[0].gradeKey;
    const values = [
      req.body.assignments,
      req.body.hw,
      req.body.exams,
      usedID
    ];
    const query = 'UPDATE grades SET assignments = ?, hw = ?, exams = ? WHERE gradeKey = ?'
    const [result] = await connection.execute(query, values);
    console.log(JSON.stringify(gradeID))
    return res.json(gradeID);
  } catch(err) {
    console.error(`Error getting password: ${err.message}`, err);
    return res.json('error updating course');;
  }
};
  
// Export the controller functions
module.exports = {
    getGrades,
    edit_grade
};