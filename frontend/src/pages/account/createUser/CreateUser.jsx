import React from 'react'
import './createUser.css'
import { useState } from 'react';

import StudentType from './studentType/StudentType';
import AdminType from './adminType/AdminType';



const CreateUser = (props) => {

  const [account, setAccount] = useState('');

  function onChangeValue(e) {
    setAccount(e.target.value);
  }

  return (
    <div>
      <div onClick={onChangeValue} className='radio'>
        <input type="radio" value="Student" name="userType" /> Student
        <input type="radio" value="Admin" name="userType" /> Admin
      </div>
      {account === "Student" && <StudentType setCreated = {props.setCreated}/>}
      {account === "Admin" && <AdminType setCreated = {props.setCreated}/>}
    </div>
  
  )
}

export default CreateUser
