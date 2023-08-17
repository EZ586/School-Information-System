import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Login from './pages/account/login/Login';
import LoginChoice from './pages/account/login/Login_choice';
import Navbar from './pages/navbar/Navbar';
import Courses from './pages/courses/Courses';
import Home from './pages/home/Home';
import CreateAccount from './pages/account/createAccount/CreateAccount';
import CreateUser from './pages/account/createUser/CreateUser';
import CreateCourse from './pages/courses/CreateCourses';
import AdminCreate from './pages/adminCreate/AdminCreate';
import TeacherCreate from './pages/grades/TeacherGrades.jsx';
import ParentInfo from './pages/info/ParentInfo.jsx';
import StudentInfo from './pages/info/StudentInfo.jsx';



function App() {
  const [toggleNav, setNav] = useState(false);
  const [person, setPerson] = useState('');
  const [user, setUser] = useState('');
  const [created, setCreated] = useState(false);
  return (
    <div className="App">
      {toggleNav 
        ? <Navbar setNav1 = {setNav} person = {person}/>
        : <></>
      }
      <Routes>
        <Route path="/" element={<LoginChoice setPerson = {setPerson}/>} />
        <Route path="Login" element={<Login setNav = {setNav} person = {person} created = {created} user = {user} setUser = {setUser}/>} />
        <Route path="courses" element={<Courses user = {user}/>} />
        <Route path="home" element={<Home person = {person} user = {user}/>} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="create-user" element={<CreateUser setCreated = {setCreated} />} />
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="create-admin" element={<AdminCreate />} />
        <Route path="teacher-grades" element={<TeacherCreate user = {user}/>} />
        <Route path="parentInfo" element={<ParentInfo user = {user}/>} />
        <Route path="studentInfo" element={<StudentInfo user = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;
