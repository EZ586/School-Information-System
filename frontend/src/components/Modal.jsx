import React from 'react'
import { useState } from 'react';
import FormInput from './FormInput.jsx'
import './modal.css'

const Modal = ({ closeModal, onSubmit }) => {

  const [inputs, setInputs] = useState({
    "assignments": "",
    "hw": "",
    "exams": "",
  });

  const formInputs = [
    {
      id: 1,
      name: "assignments",
      type: "number",
      errorMessage:
        "Grade should be a number and take up to 3 places",
      label: "Assignments",
      pattern: "^(?:0|[1-9]\\d*)$",
      required: true
    },
    {
      id: 2,
      name: "hw",
      type: "number",
      errorMessage:
        "Grade should be a number and take up to 3 places",
      label: "HW",
      pattern: "^(?:100|\\d{1,2})$",
      required: true
    },
    {
      id: 3,
      name: "exams",
      type: "number",
      errorMessage:
        "Grade should be a number and take up to 3 places",
      label: "Exams",
      pattern: "^(?:100|\\d{1,2})$",
      required: true
    }
  ]

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(inputs);

    closeModal();
  };

  return (
    <div>
      <div className='modal-container'>
        <div className='modal'>
          <form onSubmit={handleSubmit}>
            {formInputs.map((input) => (
              <FormInput onSubmit={handleSubmit}
                key={input.id}
                {...input}
                value={inputs[input.name]}
                onChange={handleChange}
              />
            ))}
            <button>Submit</button>
          </form>
        </div>    
      </div>
    </div>
  )
}

export default Modal
