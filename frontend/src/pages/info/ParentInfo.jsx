import React from 'react'
import { useState, useEffect } from 'react';
import Select from 'react-select';
import './parentInfo.css'
import axios from 'axios';

const ParentInfo = (props) => {

  const [userInfo, setUserInfo] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // create user obj
        console.log("Parent Prop: " + JSON.stringify(props.user))
        const userID = {parentID: props.user.ID}
        const res = await axios.post('http://localhost:4000/parents/get_ParChilds', userID);
        setStudents(res.data)
        console.log("students: " + JSON.stringify(students))
      } catch (error) {
        console.log(error.response);
      }
    };
  
    fetchData();
  
  }, [props.user]);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // create user obj
        const userID = {student_id: selectedOption.value}
        console.log("UserID: " + JSON.stringify(userID))
        const res = await axios.post('http://localhost:4000/students/grades', userID);
        setUserInfo(res.data)
        console.log(JSON.stringify(userInfo))
      } catch (error) {
        console.log(error.response);
      }
    };

    if (selectedOption) {
      fetchData();
    }
  
  }, [selectedOption]);

  const fetchData = async () => {
    try {
      // create user obj
      const userID = {student_id: selectedOption}
      console.log("UserID: " + JSON.stringify(userID))
      const res = await axios.post('http://localhost:4000/students/grades', userID);
      setUserInfo(res.data)
      console.log(JSON.stringify(userInfo))
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    fetchData();
  };

  return (
    <div>
       <p>Parent Info</p>
       <Select
        options={students}
        value={selectedOption}
        onChange={handleSelectChange}
      />
      {selectedOption && userInfo.map((course) => (
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

export default ParentInfo
