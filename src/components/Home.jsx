import React, { useState } from 'react'
import { useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import TodayIcon from '@mui/icons-material/Today';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import './home.css'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Context from '../Context/Context'
import Schedule from './Schedule'
import Todo from './Todo'
import Notes from './Notes'
import Attendence from './Attendence';
import Homes from './Homes';
import Dashboard from './Dashboard';
import Discussion from '../Discussion/Discussion';
import QuestionAnswer from '../Discussion/QuestionAnswer';
import toast, { Toaster } from 'react-hot-toast';
const Home = () => {
    const [isexpanded, setexpanded] = useState(false)
    const navigate = useNavigate()
    const { token, page, setpage, setToken, questionId } = useContext(Context)
    useEffect(() => {
        if (!token)
            navigate('/login')           
    }, [token])
    return (
        <>
            <Toaster toastOptions={{
                style: {
                    border: '1px solid white',
                    padding: '16px',
                    color: 'white',
                    backgroundColor: '#0d0e23'
                },
            }} />
            <div className="head">
                <button onClick={() => setexpanded(true)}>
                    <MenuIcon />
                </button>
                <h1>
                    {page === 1 ? "StudySync" : page === 2 ? 'Calender' : page === 3 ? 'To-Do' : page === 4 ? 'Notes' : page === 5 ? 'Attendance' : page === 6 ? 'Discussion' : page === 8 ? 'Question' : 'User-Details'}
                </h1>
                <div style={{ padding: '20px' }}>

                </div>
            </div>
            <div className='contt'>
                <div className={`sidebar ${isexpanded ? 'expanded' : ""}`}>
                    <div className="logo">
                        <strong>{isexpanded ? 'StudySync' : "SS"}</strong>
                    </div>
                    <div className="top">
                        <button onClick={() => { setpage(1); setexpanded(false) }}
                            style={{
                                background: `${page === 1 ? 'white' : '#24243c'}`,
                                color: `${page === 1 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Home' : <HomeIcon />}</button>
                        <button onClick={() => { setpage(2); setexpanded(false) }}
                            style={{
                                background: `${page === 2 ? 'white' : '#24243c'}`,
                                color: `${page === 2 ? 'black' : 'white'}`
                            }}
                        > {isexpanded ? 'Calender' : <TodayIcon />}</button>
                        <button onClick={() => { setpage(3); setexpanded(false) }}

                            style={{
                                background: `${page === 3 ? 'white' : '#24243c'}`,
                                color: `${page === 3 ? 'black' : 'white'}`
                            }}>{isexpanded ? 'To-Do' : <ChecklistIcon />}</button>
                        <button onClick={() => { setpage(4); setexpanded(false) }}
                            style={{
                                background: `${page === 4 ? 'white' : '#24243c'}`,
                                color: `${page ===4 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Notes' : <NoteAddIcon />}</button>
                        <button onClick={() => { setpage(5); setexpanded(false) }}
                            style={{
                                background: `${page === 5 ? 'white' : '#24243c'}`,
                                color: `${page === 5 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Attendence' : <HowToRegIcon />}</button>

                        <button onClick={() => { setpage(6); setexpanded(false) }}
                            style={{
                                background: `${page === 6 ? 'white' : '#24243c'}`,
                                color: `${page === 6 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Discussion' : <QuestionAnswerIcon />}</button>
                    </div>
                    <div className="bottom">
                        <button onClick={() => { setpage(7); setexpanded(false) }}>{isexpanded ? 'User-Details' : <PersonIcon />}</button>
                        <button onClick={() => {
                            if (window.confirm("Are You Sure You Want To Log Out ?") === true) {

                                localStorage.removeItem('token')
                                setToken(null)
                                navigate('/login')
                            }
                        }}>{isexpanded ? 'Logout' : <LogoutIcon />}</button>
                        <button className={`toggle-button`} onClick={() => setexpanded(!isexpanded)}>{isexpanded ? '<' : ">"}</button>
                    </div>
                </div>
                <div className="right">
                    {
                        page === 1 ? <Homes /> : page === 2 ? <Schedule /> : page === 3 ? <Todo /> : page === 4 ? <Notes /> : page === 7 ? <Dashboard /> : page === 6 ? <Discussion /> : page === 8 ? <QuestionAnswer questionId={questionId} /> : <Attendence />
                    }
                </div>
            </div>
        </>
    )
}

export default Home
