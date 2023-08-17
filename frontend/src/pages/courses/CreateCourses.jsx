import React from 'react'
import './createCourses.css'
import FormInput from '../../components/FormInput.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCourses = () => {

  const [type, setType] = useState('Create');    
  const [teacherIDs, setTeacherIDs] = useState([]);    
  const [courseID, setcourseID] = useState(0);    
  const [courseIDList, setCourseIDList] = useState([]);    
  const [createSuccess, setCreateSuccess] = useState(false);    
  const [editSuccess, setEditSuccess] = useState(false);    

  const [inputs, setInputs] = useState({
    "courseID": "",
    "course_name": "",
    "profID": "",
    "max_capacity": "",
  });

  function onChangeValue(e) {
    setType(e.target.value);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  async function clickSubmit(e) {
    e.preventDefault();
    console.log(inputs);
    console.log(teacherIDs);
    console.log("Teacher ID Input: " + inputs.profID)
    // check if input teacher id exists
    if (teacherIDs.includes(Number(inputs.profID))) {
      const res = await axios.post("http://localhost:4000/courses/create", inputs);
      console.log("Course ID: " + res.data);
      setcourseID(res.data);
      setCreateSuccess(true);
    } else {
      setCreateSuccess(false);
      console.log("No Teacher ID exists")
    }
  }
  
  async function clickEdit(e) {
    e.preventDefault();
    console.log(courseIDList);
    // check if input course id exists
    if (courseIDList.includes(Number(inputs.courseID)) && teacherIDs.includes(Number(inputs.profID))) {
      await axios.put("http://localhost:4000/courses/edit", inputs);
      setEditSuccess(true);
      setcourseID(inputs.courseID);
      console.log("Success CASE!!")
    } else {
      setEditSuccess(false);
      console.log("NOPE")
    }
  }

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // get res for teacher id
        const resProf = await axios.get('http://localhost:4000/teachers');
        // get teacher IDs
        setTeacherIDs(resProf.data.map(obj => obj.ID));
        // get res for course id
        const resCourse = await axios.get('http://localhost:4000/courses/coursesID');
        // get course IDs
        setCourseIDList(resCourse.data);
      } catch (error) {
        console.log(error.response.data)
      }
    };
  
    fetchData();
  
  }, []);


  const submitInputs = [
    {
      id: 1,
      name: "course_name",
      type: "text",
      placeholder: "Enter Course Name Here",
      label: "Course Name",
      required: true
    },
    {
      id: 2,
      name: "profID",
      type: "number",
      placeholder: "Enter Prof ID Here",
      label: "Prof ID",
      required: true
    },
    {
      id: 3,
      name: "max_capacity",
      type: "number",
      placeholder: "Max Capacity Here",
      label: "Max Capacity",
      required: true,
    }
  ]

  const editInputs = [
      {
        id: 0,
        name: "courseID",
        type: "number",
        placeholder: "Enter Course ID Here",
        label: "Course ID",
        required: true
      },  
      {
        id: 1,
        name: "course_name",
        type: "text",
        placeholder: "Enter Course Name Here",
        label: "Course Name",
        required: true
      },
      {
        id: 2,
        name: "profID",
        type: "number",
        placeholder: "Prof ID",
        label: "Prof ID",
        required: true
      },
      {
        id: 3,
        name: "max_capacity",
        type: "number",
        placeholder: "Max Capacity Here",
        label: "Max Capacity",
        required: true
      }
  ]

  return (
    <div className='container-course'>
      <div onClick={onChangeValue} className='radio'>
        <input type="radio" value="Create" name="userType" defaultChecked /> Create Course
        <input type="radio" value="Edit" name="userType" /> Edit Course
      </div>
      {type === "Create" && <form onSubmit={clickSubmit}>
        {submitInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputs[input.name]}
            onChange={handleChange}
          />
        ))}
        <button>Create Course</button>
        {createSuccess && <p>Course ID: {courseID } has been created successfully!</p>}
        {!(teacherIDs.includes(Number(inputs.profID))) && <p>Teacher ID does not exist!</p>}
      </form>}
      {type === "Edit" && <form onSubmit={clickEdit}>
        {editInputs.map((input) => (
          <FormInput className="forminput"
            key={input.id}
            {...input}
            value={inputs[input.name]}
            onChange={handleChange}
          />
        ))}
        <button>Edit Course</button>
        {editSuccess && <p>Course ID: {courseID}  edited successfully!</p>}
        {!(courseIDList.includes(Number(inputs.courseID))) && <p>Course ID does not exist!</p>}
        {!(teacherIDs.includes(Number(inputs.profID))) && <p>Teacher ID does not exist!</p>}
      </form>}
    </div>
  )
}

export default CreateCourses
