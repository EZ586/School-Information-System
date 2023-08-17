import React from 'react'
import {   useEffect } from 'react';
import axios from 'axios';
import './home.css'

const Home = (props) => {

  useEffect(() => {

    const fetchData = async () => {
    try {
      // get response
      const res = await axios.get('http://localhost:4000/' + props.person);
      // get data from response
      const res_data = res.data;
      console.log(res_data);
      console.log(props.person);
      console.log("-------------------");
    } catch (error) {
      console.log(error.response.data)
    }
  };

    fetchData();
  
  }, [props.person]);


  return (
    <div>
      {props.person === "students" && <div className='home'>
        <h1>Student Information</h1>
        <p>Student ID: {props.user.studentID}</p>
        <p>Username: {props.user.studentUser}</p>
        <p>First Name: {props.user.first_name}</p>
        <p>Last Name: {props.user.last_name}</p>
        <p>Birth Date: {props.user.birthdate.slice(0,10)}</p>
      </div>}
      {props.person === "admin" && <div className='home'>
        <h1>Admin Information</h1>
        <p>Username: {props.user.adminUser}</p>
      </div>}
      {props.person === "parents" && <div className='home'>
        <h1>Parent Information</h1>
        <p>Parent ID: {props.user.ID}</p>
        <p>Username: {props.user.username}</p>
        <p>First Name: {props.user.first_name}</p>
        <p>Last Name: {props.user.last_name}</p>
      </div>}
    </div>

  )
}

export default Home
