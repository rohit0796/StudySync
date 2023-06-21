import React, { useState } from 'react';
import './attendence.css'
const AttendanceForm = ({subjectName , change , setChange}) => {
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('present');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newAttendance = {
      subjectName: subjectName,
      date,
      status,
    };

    try {
      const response = await fetch('/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(newAttendance),
      });

      if (response.ok) {
        // Attendance recorded successfully
        console.log('Attendance recorded');
      } else {
        console.log('Failed to record attendance');
      }
    } catch (error) {
      console.error('Error recording attendance:', error);
    }
    setChange(!change)
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
      </div>
      <div>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AttendanceForm;
