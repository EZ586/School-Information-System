import React from 'react'
import './courses.css'
import FormInput from '../../components/FormInput.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = (props) => {

  const [registClass, setRegistClass] = useState([]);    
  const [courseIDs, setCourseIDs] = useState([]);  
  const [currCourseList, setCurrCourseList] = useState([]);  
  const [input, setInput] = useState({"course_id":0,"student_id":props.user.studentID.toString()});  
  const [opSucc, setOpSucc] = useState({
    "subBool": false,
    "subVal": 0,
    "delBool": false,
    "delVal": 0,
    "capBool": false
  });  

  const courseInput = 
    {
      id: 1,
      name: "course_id",
      type: "number",
      placeholder: "Enter Course ID Here",
      label: "Course ID",
      required: true
    }

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // get res for course ids
        const resCourseIDs = await axios.get('http://localhost:4000/courses/coursesID');
        // get user data
        const userData = props.user;
        setCourseIDs(resCourseIDs.data);
        // get registered courses
        const resRegisIDs = await axios.post('http://localhost:4000/courses/getRegistered', userData);
        setRegistClass(resRegisIDs.data);
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchData();
  
  }, [props.user]);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
           // get curr registered course info
           const listOjb = {"courseIDList": registClass}
           console.log("Use Effect Sent: \n" + JSON.stringify(listOjb))
   
        const currInfo = await axios.post('http://localhost:4000/courses/info', listOjb);
        console.log("CurrINfo: \n" + JSON.stringify(currInfo))
        setCurrCourseList(currInfo.data)
      } catch (error) {
        console.log(error)
      }
    };
  
    fetchData();
  
  }, [registClass]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput(values => ({...values, [name]: value}))
  }

  function handleTest(e) {
    e.preventDefault();
    console.log("----------------------------")
    console.log("currCourseList: \n" + JSON.stringify(currCourseList))
    console.log("Course Ids: \n" + courseIDs)
    console.log("Registered Ids: \n" + registClass)
    console.log("Input: \n" + JSON.stringify(input))
    console.log("Op Success: \n" + JSON.stringify(opSucc))
    console.log("Props user: \n" + JSON.stringify(props.user))
  
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (courseIDs.includes(Number(input.course_id)) && !registClass.includes(Number(input.course_id))) {
      const resCap = await axios.post("http://localhost:4000/courses/capCheck", input);
      if (resCap.data) {
        await axios.post("http://localhost:4000/courses/register", input);
        setOpSucc(prev => ({...prev, "subBool": true, "capBool": false, "subVal": input.course_id}))
        console.log("----------------------------")
        console.log("Original CourseID List: \n" + JSON.stringify(registClass))
        setRegistClass((prevRegistClass) => [...prevRegistClass, Number(input.course_id)]);
        console.log("New CourseID List: \n" + JSON.stringify(registClass))
      } else {
        setOpSucc(prev => ({...prev, "subVal": input.course_id, "capBool": true}))
        console.log("Course Full")
      }
      
    } else {
      setOpSucc(prev => ({...prev, "subBool": false}))
    }
    
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (courseIDs.includes(Number(input.course_id)) && registClass.includes(Number(input.course_id))) {
      console.log("Delete Input: \n" + JSON.stringify(input))
      await axios.delete(`http://localhost:4000/courses/deleteRegistered?student_id=${input.student_id}&course_id=${input.course_id}`);
      setOpSucc(prev => ({...prev, "delBool": true, "subBool": false, "delVal": input.course_id}))
      setRegistClass((prevRegistClass) =>
        prevRegistClass.filter(courseId => courseId !== Number(input.course_id))
      );
    } else {
      setOpSucc(prev => ({...prev, "delBool": false}))
    }

  }

  return (
    <div className='course-page'>
      <div className='course_page_heading_area'>
        <h1>Course Registration</h1>
      </div>

      <div className='regist_container'>

        <div className='fiiler_side' />

        <div className='left_side'>
          <p>Here is Left Side!</p>
          {<form onSubmit={handleSubmit}>
            <FormInput
              key={courseInput.id}
              {...courseInput}
              value={input[input.name]}
              onChange={handleChange}
            />
            <button>Register Course</button>
            <button onClick={handleDelete}>Drop Course</button>
            <button onClick={handleTest}>Test</button>
           {!courseIDs.includes(Number(input.course_id)) && <p>Course ID does not exist!</p>}
           {registClass.includes(Number(input.course_id)) && <p>Course already registered!</p>}
           {opSucc.subBool && <p>Course ID: {opSucc.subVal} registered successfully!</p>}
           {opSucc.delBool && <p>Course ID: {opSucc.delVal} dropped successfully!</p>}
           {opSucc.capBool && <p>Course ID: {opSucc.subVal} is full!</p>}
          </form>}
        </div>

        <div className='right_side'>
          {currCourseList.map((course) => (
          <div className='course'  key={course.courseID}>
            <p>Id Courses: {course.courseID}</p>
            <p>Curr Capacity: {course.curr_capacity}</p>
            <p>Max Capacity: {course.max_capacity}</p>
            <p>Professor: {course.profID}</p>
            <p>Course Name: {course.course_name}</p>
          </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default Courses
