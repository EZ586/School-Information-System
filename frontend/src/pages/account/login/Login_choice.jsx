import React from 'react';
import './login_choice.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login_choice = (props) => {

  const navigate = useNavigate();

  function studentChoice() {
    props.setPerson('students');
    navigate('/login');
  }

  function parentChoice() {
    props.setPerson('parents');
    navigate('/login');
  }

  function teacherChoice() {
    props.setPerson('teachers');
    navigate('/login');
  }

  function adminChoice() {
    props.setPerson('admin');
    navigate('/login');
  }

  return (
    <div className='loginChoice'>
      <p>Pick Login Here! </p>
      <div className='buttons'>
        <button onClick={studentChoice}>Student</button>
        <button onClick={parentChoice}>Parent</button>
        <button onClick={teacherChoice}>Teacher</button>
        <button onClick={adminChoice}>Admin</button>
      </div>
      <div className='noAccount'>
        <p>No Account?</p>
        <Link to="/create-user">Create New Acount Here!</Link>
      </div> 
    </div>
  )
}

export default Login_choice
