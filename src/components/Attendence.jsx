import React, { useEffect, useState } from 'react'
import './attendence.css'
import AttendanceForm from './AttendenceForm';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSubjectForm from './AddSubjectForm';
import FullAttendance from './FullAttendance';
import { ThreeDots } from 'react-loader-spinner';
const Attendence = () => {
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false)
  const [open, setopen] = useState(false)
  const [ind, setind] = useState()

  const fetchUser = async () => {
    fetch('/todo', {
      method: "GET",
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((dat) => dat.json()).then((val) => setUser(val.data))

  };
  const DeleteSub = (ind) => {
    setopen(!open)
    var sub = user.subjects
    sub.splice(ind, 1);
    if (window.confirm('Sure you want to delete the subject') === true) {
      fetch('/subupdate', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(sub)
      }).then((val) => val.json()).then((dat) => console.log(dat));
      fetchUser()
    }
  }
  useEffect(() => {
    // Fetch user data by userId
    fetchUser();
  }, [subjects, change]);

  const handleSubjectAdded = (subject) => {
    setSubjects((prevSubjects) => [...prevSubjects, subject]);
  };
  if (!user)
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    )
  else
    return (

      <div className='AA'>
        <div className="header">
          <h1>Attendance</h1>
        </div>
        {!user ? (
          <p>Loading...</p>
        ) : (
          <div className='attend-cont'>
            <h3>Subjects</h3>
            {user.subjects.length === 0 ? (
              <p>No subjects added yet.</p>
            ) : (
              <ul>
                {user.subjects.map((subject, ind) => {
                  var totalClass = user.subjects[ind].attendance.length
                  var newarr = user && user.subjects[ind].attendance.filter((ele) => ele.status == 'present')
                  var present = newarr.length
                  const att = (present / totalClass) * 100
                  return (
                    <div key={ind} className='subjects'>
                      <div className="percent">
                        {att ? att.toFixed(2) : 0}%
                      </div>
                      <span>{subject && subject.name}</span>
                      <AttendanceForm subjectName={subject.name} change={change} setChange={setChange} />
                      <a onClick={() => setind(ind)}>Show Full Attendance</a>
                      <button style={{ color: '#0d0e23', margin: 0, border: 'none', background: 'transparent', outline: 'none' }} onClick={() => setopen(!open)}>{open ? "△" : "▽"}</button>
                      {
                        open && <a onClick={() => { DeleteSub(ind) }}><DeleteIcon /></a>
                      }
                    </div>
                  )
                })}
              </ul>
            )}
            <AddSubjectForm onSubjectAdded={handleSubjectAdded} />
          </div>
        )}
        {
          ind != null ? <FullAttendance subject={user.subjects[ind]} /> : <div className='header'>Please Select a subject To See Its Full Attendance</div>
        }
      </div>

    );
}

export default Attendence
