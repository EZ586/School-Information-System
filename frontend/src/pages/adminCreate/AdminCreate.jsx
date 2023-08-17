import React from 'react'
import { useState } from 'react';
import './adminCreate.css'

import ParentCreate from './parentCreate/ParentCreate';
import TeacherCreate from './teacherCreate/TeacherCreate.jsx';

const AdminCreate = () => {
  const [type, setType] = useState('parent');    

  function onChangeValue(e) {
    setType(e.target.value);
  }

  return (
    <div className='adminCreateContainer'>
      <h1>Parent and Teacher Creation</h1>
      <div onClick={onChangeValue} className='radio'>
        <input type="radio" value="parent" name="userType" /> Parent
        <input type="radio" value="teacher" name="userType" /> Teacher
      </div>
      {type==='parent' && <ParentCreate />}
      {type==='teacher' && <TeacherCreate />}
    </div>
  )
}

export default AdminCreate
