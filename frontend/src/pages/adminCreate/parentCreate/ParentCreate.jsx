import React from 'react'
import { useState, useEffect } from 'react';
import './parentCreate.css'
import FormInput from '../../../components/FormInput.jsx'
import axios from 'axios';

const ParentCreate = () => {

  const [studentID, setStudentID] = useState([]);
  const [parentID, setParentID] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [isInvalid, setValid] = useState(false);
  const [created, setCreated] = useState(false);
  const [childSuccess , setChildSuccess ] = useState({
    "isSuccess": false,
    "isDuplicate": false,
    "studentID": "",
    "parentID": ""
  });
  const [username, setUsername] = useState([]);
  const [inputs, setInputs] = useState({
    "username": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "studentID": "",
    "parentID": ""
  });

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // get full response
        const res = await axios.get('http://localhost:4000/parents');
        const resStud = await axios.get('http://localhost:4000/students');
        const parChild = await axios.get('http://localhost:4000/parents/get_Childs');
        // get usernames
        setUsername(res.data.map(obj => obj.username));
        setParentID(res.data.map(obj => obj.ID));
        setStudentID(resStud.data.map(obj => obj.studentID));
        // get parent child relationships
        setRelationships(parChild.data);
      } catch (error) {
        console.log(error.response);
      }
    };
  
    fetchData();
  
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  async function handleSubmit(e) {
    console.log("Inputs:\n" + JSON.stringify(inputs));
    if (username.includes(inputs.username)) {
      setValid(true);
    } else {
      setValid(false);
      setCreated(true);
      console.log("Submitting!");
      try {
        await axios.post("http://localhost:4000/parents/create", inputs);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function childSubmit(e) {
    e.preventDefault();
    if (studentID.includes(Number(inputs.studentID)) && parentID.includes(Number(inputs.parentID))) {
      if (!findOjb(relationships, inputs)) {
        setChildSuccess({"isSuccess": true, "isDuplicate": false,"studentID": inputs.studentID, "parentID": inputs.parentID})
        console.log("SUBMIT SUCCESS!! YAY!!!")
        await axios.post("http://localhost:4000/parents/insert_child", inputs);
        const parChild = await axios.get('http://localhost:4000/parents/get_Childs');
        setRelationships(parChild.data)
      } else {
        setChildSuccess(values => ({...values, "isDuplicate": true}));
        console.log("DUPLICATE RELATIONSHIP FOUND!!!")
      }
    } else { 
      console.log("Student or Parent ID doesn't exist")
      setChildSuccess(values => ({...values, "isSuccess": false}));
    }
  }

  const handleTest = (e) => {
    e.preventDefault();
    console.log("StudentID\n" + studentID)
    console.log("ParentID\n" + parentID)
    console.log("Input\n" + JSON.stringify(inputs))
    // relationships testing
    console.log("Relationships:\n" + JSON.stringify(relationships))
    findOjb(relationships, inputs)
  }

  function findOjb(objList, obj) {

    const foundObject = objList.find(item => {
      return item.studentID.toString() === obj.studentID && item.parentID.toString() === obj.parentID;
    });
    
    if (foundObject) {
      console.log("obj exists!!");
      return true;
    } else {
      console.log("obj does not exist!!");
      return false;
    }
  }


  const formInputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      placeholder: "First Name",
      errorMessage:
        "First name should be 3-16 characters and shouldn't include any special character!",
      label: "First Name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
      errorMessage:
        "Last name should be 3-16 characters and shouldn't include any special character or numbers!",
      label: "Last Name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      required: true
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      required: true
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: inputs.password,
      required: true,
    }
  ]

  const childInputs = [
    {
      id: 6,
      name: "parentID",
      type: "number",
      placeholder: "Enter Parent ID Here",
      label: "Parent ID",
      required: true,
    },
    {
      id: 7,
      name: "studentID",
      type: "number",
      placeholder: "Enter Student ID Here",
      label: "Student ID",
      required: true,
    }
  ]


  return (
    <div className='parentContainer'>

      <div className='parentCreation'>
        <h1>Parent Creation</h1>
        <form onSubmit={handleSubmit}>
        {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputs[input.name]}
            onChange={handleChange}
          />
        ))}
          <button>Submit</button>
          <button onClick={handleTest}>Testing</button>
          {isInvalid && <p>Username already used!</p>}
          {created && <p>User: {inputs.username} created!</p>}
        </form>
      
      </div>

      <div className='childAdd'>
        <h1>Add Child</h1>
        <form onSubmit={childSubmit} className='childForm'>
          {childInputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={inputs[input.name]}
              onChange={handleChange}
            />
          ))}
          <button>Submit</button>
          {!(studentID.includes(Number(inputs.studentID)) && parentID.includes(Number(inputs.parentID)) )&& <p>Student or Parent ID doesn't exist!</p>}
          {childSuccess.isDuplicate && <p>Child and Parent ID relationship already established!</p>}
          {childSuccess.isSuccess && <p>Parent ID: {childSuccess.parentID} and Student ID: {childSuccess.studentID} relationship submitted!</p>}
        </form>
      </div>
      
    </div>
  )
}

export default ParentCreate
