import React from 'react'
import { useState, useEffect } from 'react';
import './teacherCreate.css'
import FormInput from '../../../components/FormInput.jsx'
import axios from 'axios';

const TeacherCreate = () => {

  const [isInvalid, setValid] = useState(false);
  const [created, setCreated] = useState(false);
  const [username, setUsername] = useState([]);
  const [inputs, setInputs] = useState({
    "username": "",
    "password": "",
    "first_name": "",
    "last_name": "",
  });

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        // get full response
        const res = await axios.get('http://localhost:4000/teachers');
        // get usernames
        setUsername(res.data.map(obj => obj.username));
      } catch (error) {
        console.log(error.response.data)
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
        await axios.post("http://localhost:4000/teachers/create", inputs);
      } catch (err) {
        console.log(err);
      }
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

  return (
    <div className='teacherContainer'>
      <p>Teacher</p>
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
        {isInvalid && <p>Username already used!</p>}
        {created && <p>User: {inputs.username} created!</p>}
      </form>
    </div>
  )
}

export default TeacherCreate
