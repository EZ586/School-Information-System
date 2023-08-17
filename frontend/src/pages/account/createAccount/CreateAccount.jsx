import React from 'react'
import './createAccount.css'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateAccount() {

  const navigate = useNavigate();

  // variables
  const [username, setUsername] = useState([]);
  const [data, setData] = useState('');
  const [uservalues, setUservalues] = useState({
    Username: "",
    Password: ""
  });

  async function create(e) {
    e.preventDefault();
    // check if username is taken
    let isTaken = username.includes(uservalues.Username)
    console.log("UserTaken?: \n" + isTaken);
    if (!isTaken) {
      try {
        await axios.post("http://localhost:4001/books", uservalues);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function back() {
    navigate('/')
  }

 
  useEffect(() => {

     const fetchData = async () => {
      try {
        // get full response
        const res = await axios.get('http://localhost:4001/books');
        // get usernames
        setUsername(res.data.map(obj => obj.Username));
        let dataArr = res.data.map(obj => obj.Username);
        setData(dataArr);
      } catch (error) {
        console.log(error.response.data)
      }
    };

    fetchData();

  }, []);

  
  function handleSubmit(e) {
    setUservalues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className='createAccount'>
      <p>This is account place: {data}</p>
      <div className='create_username'>
        <p>Username:</p>
        <input type="text" name="Username" onChange={handleSubmit} />
      </div>
      {
       username.includes(uservalues.Username) && <div>Not Allowed!</div>
      }
      <div className='create_password'>
        <p>Password:</p>
        <input type="text" name="Password" onChange={handleSubmit}/>
      </div>
      <button onClick={create}>Create Account</button>
      <button onClick={back}>Back</button>
    </div>
  )
}
