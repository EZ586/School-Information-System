import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormInput from '../../../components/FormInput.jsx';
import './login.css'

import { useNavigate } from 'react-router-dom';


const Login = (props) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState([]);
  const [loginValid, setLoginValid] = useState(false);
  const [inputs, setInputs] = useState({
    "username": "",
    "password": ""
  });

  async function click(e) {
    e.preventDefault();
    console.log("Hey");
    console.log("Username:\n" + JSON.stringify(username));
    console.log("IsIn??:\n" + username.includes(inputs.username));
    // case where username is included
    if (username.includes(inputs.username)) {
      const res = await axios.post('http://localhost:4000/' + props.person + '/pass', inputs);
      console.log("HEREEE")
      console.log(res.data); 
      if (inputs.password === res.data) {
        const res = await axios.post('http://localhost:4000/' + props.person + '/info', inputs);
        console.log(JSON.stringify(res.data));
        props.setUser(res.data)
        console.log("SUCCESS!!");
        setLoginValid(false);
        props.setNav(true);
        navigate('/home')
      } else {
        console.log("Password Failure")
        setLoginValid(true);
      }
    } else {
      console.log("PLS NOT HERE!!??")
      setLoginValid(true);
    }
  }

  function back() {
    navigate('/')
  }

  
  
  useEffect(() => {
    const usernamesFunc = {
      'admin': (res_data) => setUsername(res_data.map(obj => obj.adminUser)),
      'students': (res_data) => setUsername(res_data.map(obj => obj.studentUser)),
      'parents': (res_data) => setUsername(res_data.map(obj => obj.username)),
      'teachers': (res_data) => setUsername(res_data.map(obj => obj.username))
    };

    const fetchData = async () => {
    try {
      // get full response
      const res = await axios.get('http://localhost:4000/' + props.person);
      // get data from response
      const res_data = res.data;
      console.log(res_data);
      // get usernames
      usernamesFunc[props.person](res_data)
      console.log("-------------------");
    } catch (error) {
      console.log(error.response)
    }
  };

    fetchData();
  
  }, [props.person]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  const formInputs = [
    {
      id: 9,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true
    },
    {
      id: 10,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true
    }
  ]

  return (
    <div className='login'>
      {props.person === "students" && <h2>Student Login Page</h2>}
      {props.person === "admin" && <h2>Admin Login Page</h2>}
      {props.person === "teachers" && <h2>Teacher Login Page</h2>}
      {props.person === "parents" && <h2>Parent Login Page</h2>}
      
      <form onSubmit={click}>
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
        <button onClick={back}>Back</button>
        <button>Login</button>
      </form>
      {loginValid && <p className='validity'>Invalid username or password!</p>}
      {props.created && <p>User Created!</p>}
    </div>
  )
}

export default Login
