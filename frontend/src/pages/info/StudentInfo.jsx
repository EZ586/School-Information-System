import React from 'react'
import { useState, useEffect } from 'react';
import './studentInfo.css'
import axios from 'axios';

const StudentInfo = (props) => {

  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // create user obj
        const userID = {student_id: props.user.studentID}
        console.log("UserID: " + JSON.stringify(userID))
        const res = await axios.post('http://localhost:4000/students/grades', userID);
        setUserInfo(res.data)
      } catch (error) {
        console.log(error.response);
      }
    };
  
    fetchData();
  
  }, [props.user]);

  return (
    <div>
      <p>Student Info</p>
      {userInfo.map((course) => (
          <div className='stu_course'  key={course.courseID}>
            <p>Course Name: {course.courseID}</p>
            <p>Course ID: {course.course_name}</p>
            <p>Assignments: {course.assignments}</p>
            <p>HW: {course.hw}</p>
            <p>Exams: {course.exams}</p>
          </div>
      ))}
    </div>
  )
}

export default StudentInfo
