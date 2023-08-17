import React from 'react'
import './table.css'

const Table = ({ rows, editRow, tableIDX }) => {
  return (
    <div className='table-wrapper'>
      <table className='table'>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Assignments</th>
            <th>HW</th>
            <th>Exams</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
              return (
                <tr key={idx}>
                  <td>{row.stud_name}</td>
                  <td>{row.studentID}</td>
                  <td>{row.assignments}</td>
                  <td>{row.hw}</td>
                  <td>{row.exams}</td>
                  <td>
                    <div className='tableButton'>
                      <button onClick={() => editRow(idx, tableIDX)}>Edit</button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>  
    </div>
  )
}

export default Table
