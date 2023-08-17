import React from 'react'
import { useState, useEffect } from 'react';
import './adminType.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormInput from '../../../../components/FormInput.jsx';

const AdminType = (props) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState([]);
  const [isInvalid, setValid] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }



useEffect(() => {
  
  const fetchData = async () => {
    try {
      // get full response
      const res = await axios.get('http://localhost:4000/admin');
      // get usernames
      setUsername(res.data.map(obj => obj.adminUser));
      // console.log("-------------------");
      // console.log("Resource_File:\n" + JSON.stringify(res));
      // console.log("Result:\n" + JSON.stringify(res_data));
      // console.log("Username:\n" + JSON.stringify(username));
      // console.log("Truth_Value: \n" + username.includes("jae123"));
      // console.log(inputs.username)
      // console.log("Truth_Value: \n" + username.includes(inputs.username));
    } catch (error) {
      console.log(error.response.data)
    }
  };

  fetchData();

}, []);

async function handleTest(e) {
  e.preventDefault();
  console.log("Inputs:\n" + JSON.stringify(inputs));
  if (username.includes(inputs.username)) {
    setValid(true);
  } else {
    console.log("Submitting!");
    try {
      await axios.post("http://localhost:4000/admin/create", inputs);
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

  return (
    <div className='student'>
      <h1>Admin Registration:</h1>
      <form onSubmit={handleTest}>
        
        <div className='accountInfo'>
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
        <div className='validity'>
           {isInvalid && <p>Username already used!</p>} 
        </div>
        
      </form>

    </div>
  )
}

export default AdminType
