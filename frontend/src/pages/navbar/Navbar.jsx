import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {

  const navigate = useNavigate();

  function logout() {
    props.setNav1(false);
    navigate('/');
  }


  return (
    <div>
      <div className='container'>

        {props.person === "students" && <div className='nav'>
          <h1>School Information System</h1>
          <Link to="/home">Home</Link>
          <Link to="/studentInfo">Grades</Link>
          <Link to="/courses">Course Registration</Link>
        </div>}

        {props.person === "admin" && <div className='nav'>
          <h1>School Information System</h1>
          <Link to="/home">Home</Link>
          <Link to="/create-course">Course Creation</Link>
          <Link to="/create-admin">Teacher/Parent Creation</Link>
        </div>}

        {props.person === "parents" && <div className='nav'>
          <h1>School Information System</h1>
          <Link to="/home">Home</Link>
          <Link to="/parentInfo">Children Grades</Link>
        </div>}

        {props.person === "teachers" && <div className='nav'>
          <h1>School Information System</h1>
          <Link to="/home">Home</Link>
          <Link to="/teacher-grades">Grading</Link>
        </div>}

     
        <div className="buttonlayout">
          <button onClick={logout}>Logout</button>
        </div>
      </div> 
    </div>
    
    
  )
}

export default Navbar
