import React from 'react'
import { useState, useEffect } from 'react';
import './studentType.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../../components/FormInput.jsx';

const StudentType = (props) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState([]);
  const [isInvalid, setValid] = useState(false);

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    st_address: "",
    city: "",
    state: "",
    zip: "",
    username: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    address: 0
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const fetchData = async () => {
    try {
      // get full response
      const res = await axios.get('http://localhost:4000/students');
      // get usernames
      setUsername(res.data.map(obj => obj.studentUser));
      // console.log("-------------------");
      // console.log("Username:\n" + JSON.stringify(username));
    } catch (error) {
      console.log(error.response.data)
    }
  };

  useEffect(() => {
    
    fetchData();

  }, []);

async function handleSubmit(e) {
  e.preventDefault();
  console.log("Inputs:\n" + JSON.stringify(inputs));
  if (username.includes(inputs.username)) {
    setValid(true);
  } else {
    console.log("Submitting!");
    try {
      await axios.post("http://localhost:4000/students/commit", inputs);
    } catch (err) {
      console.log(err);
    }
    props.setCreated(true);
    navigate('/login')
  }
}

const formInputs = [
  {
    id: 9,
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
    id: 10,
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
    id: 11,
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    errorMessage: "Passwords don't match!",
    label: "Confirm Password",
    pattern: inputs.password,
    required: true,
  }
]

  const formInputPersonal = [
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
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "birthdate",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required: true
    }
  ]

  const formInputAddress = [
    {
      id: 5,
      name: "st_address",
      type: "text",
      placeholder: "Street Address",
      label: "Street Address",
      required: true
    },
    {
      id: 6,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      pattern: "^[A-Za-z0-9]{3,16}$",
      errorMessage:
        "City should be 3-16 characters and shouldn't include any special character!",
      required: true
    },
    {
      id: 7,
      name: "state",
      type: "text",
      placeholder: "State",
      label: "State",
      pattern: "^[A-Z]{2}$",
      errorMessage:
        "State should be 2 Capital letters!",
      required: true
    },
    {
      id: 8,
      name: "zip",
      type: "text",
      placeholder: "ZIP Code",
      label: "ZIP Code",
      pattern: "^[0-9]{5}(?:-[0-9]{4})?$",
      errorMessage:
        "ZIP code should be either a five digit or 9 digit number in address format\n Ex: 12345, 12345-6789!",
      required: true
    }
  ]

  return (
    <div className='student'>
      <h1>Student Registration:</h1>
      <form onSubmit={handleSubmit}>

        <div className='inputFields'>
          {formInputPersonal.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputs[input.name]}
            onChange={handleChange}
          />
        ))}
        </div>

        <div className='inputFields'>
          {formInputAddress.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputs[input.name]}
            onChange={handleChange}
          />
        ))}
        </div>
        
        <div>
          {formInputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputs[input.name]}
            onChange={handleChange}
          />
        ))}
        </div>
        <button>Submit</button>
        {isInvalid && <p>Username already used!</p>}
      </form>
    </div>
  )
}

export default StudentType
