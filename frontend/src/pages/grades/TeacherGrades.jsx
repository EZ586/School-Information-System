import React from 'react'
import { useState, useEffect } from 'react';
import Table from "../../components/Table.jsx";
import Modal from "../../components/Modal.jsx";
import './teacherGrades.css'
import axios from 'axios';

const TeacherGrades = (props) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [tableIdx, setTableIdx] = useState(0);
  const [rows, setRows] = useState([
    {
      courseID: 1322,
      courseName: "Math",
      courseStud: [
        {
          stud_name: "Bobby",
          studentID: 6731,
          assignments: 86,
          hw: 67,
          exams: 79
        },
        {
          stud_name: "Bobby",
          studentID: 6731,
          assignments: 86,
          hw: 67,
          exams: 79
        },
        {
          stud_name: "Bobby",
          studentID: 6731,
          assignments: 86,
          hw: 67,
          exams: 79
        },
        {
          stud_name: "Albert",
          studentID: 6731,
          assignments: 32,
          hw: 67,
          exams: 79
        }
      ]
    },
    {
      courseID: 1322,
      courseName: "Language Arts",
      courseStud: [
        {
          stud_name: "Georgie",
          studentID: 6731,
          assignments: 86,
          hw: 67,
          exams: 79
        },
        {
          stud_name: "Bobby",
          studentID: 6731,
          assignments: 86,
          hw: 67,
          exams: 79
        },
        {
          stud_name: "Bobby",
          studentID: 6731,
          assignments: 86,
          hw: 67,
          exams: 79
        },
        {
          stud_name: "Albert",
          studentID: 6731,
          assignments: 32,
          hw: 67,
          exams: 79
        }
      ]
    }
  ]);
  const [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        console.log(JSON.stringify(props.user))
        // create teacher obj
        const teacherID = {prof_ID: props.user.ID}
        // get full response
        const res = await axios.post('http://localhost:4000/grades', teacherID);
        setRows(res.data)
      } catch (error) {
        console.log(error.response);
      }
    };
  
    fetchData();
  
  }, [props.user]);

  const handleEditRow = (idx, tableIDX) => {
    setTableIdx(tableIDX)
    setRowToEdit(idx);
    console.log("rowToEdit: " + rowToEdit)
    console.log("tableIDX: " + tableIDX)
    setModalOpen(true);
  };

  async function handleSubmit(newRow) {
    console.log("New Row: " + JSON.stringify(newRow))
    console.log("TeacherID: " + JSON.stringify(props.user.ID))
    console.log(rows[tableIdx].courseStud[rowToEdit].studentID)
    const courseID = rows[tableIdx].courseID;
    const studentID = rows[tableIdx].courseStud[rowToEdit].studentID;
    const inputObj = {courseID: courseID, studentID: studentID, ...newRow}
    await axios.put("http://localhost:4000/grades/edit", inputObj);
    // Get the students of the course with the edited student row
    const retRow = 
        rows[tableIdx].courseStud.map((currRow, idx) => {
          if (idx !== rowToEdit) return currRow;
          console.log("Here: " + idx)
          return { ...currRow, ...newRow };
        })
    console.log("retRow: " + JSON.stringify(retRow))

    const updatedItems = rows.map((course, i) => {
      if (i === tableIdx) {
        const newCourse = {...course, courseStud: retRow}
        return newCourse;
      }
      return course;
    });
    console.log("updatedItems: " + JSON.stringify(updatedItems))
    setRows(updatedItems);
  };

  const handleTest = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(rows[0].courseID))
  };

  return (
    <div className='tGCont'>
      {rows.map((course, idx) => (
        <div id='course'>
          <p>Course ID: {course.courseID}</p>
          <p>Course Name: {course.courseName}</p>
          <Table rows={course.courseStud} editRow={handleEditRow} tableIDX = {idx}/>
        </div>
      ))}
      {modalOpen && (
        <Modal
          closeModal={() => {
            setModalOpen(false);
          }}
          onSubmit={handleSubmit}
          defaultValue={rowToEdit !== null && rows[rowToEdit]}
        />
      )}
      <button onClick={handleTest}>
       Testing
      </button>
    </div>
  )
}

export default TeacherGrades
