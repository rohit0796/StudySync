import React, { useState } from 'react'
import { useEffect } from 'react'
import jwt from 'jsonwebtoken'
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
import Context from '../Context/Context'
import Schedule from './Schedule'
import Todo from './Todo'
import Notes from './Notes'
import Attendence from './Attendence';
import Homes from './Homes';
import Dashboard from './Dashboard';
const Home = () => {
    const [page, setpage] = useState(1)
    const [isexpanded, setexpanded] = useState(false)
    const navigate = useNavigate()
    const state = useContext(Context)
    useEffect(() => {
        if (!state.token)
            navigate('/login')
    }, [state.token])
    return (
        <>
            <div className="head">
                <button onClick={() => setexpanded(true)}>
                    <MenuIcon />
                </button>
                <h1>
                    {page == 1 ? "StudySync" : page == 2 ? 'Calender' : page == 3 ? 'To-Do' : page == 4 ? 'Notes' : page == 5 ? 'Attendance' : 'User-Details'}
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
                                background: `${page == 1 ? 'white' : '#24243c'}`,
                                color: `${page == 1 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Home' : <HomeIcon />}</button>
                        <button onClick={() => { setpage(2); setexpanded(false) }}
                            style={{
                                background: `${page == 2 ? 'white' : '#24243c'}`,
                                color: `${page == 2 ? 'black' : 'white'}`
                            }}
                        > {isexpanded ? 'Calender' : <TodayIcon />}</button>
                        <button onClick={() => { setpage(3); setexpanded(false) }}

                            style={{
                                background: `${page == 3 ? 'white' : '#24243c'}`,
                                color: `${page == 3 ? 'black' : 'white'}`
                            }}>{isexpanded ? 'To-Do' : <ChecklistIcon />}</button>
                        <button onClick={() => { setpage(4); setexpanded(false) }}
                            style={{
                                background: `${page == 4 ? 'white' : '#24243c'}`,
                                color: `${page == 4 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Notes' : <NoteAddIcon />}</button>
                        <button onClick={() => { setpage(5); setexpanded(false) }}
                            style={{
                                background: `${page == 5 ? 'white' : '#24243c'}`,
                                color: `${page == 5 ? 'black' : 'white'}`
                            }}
                        >{isexpanded ? 'Attendence' : <HowToRegIcon />}</button>
                    </div>
                    <div className="bottom">
                        <button onClick={() => { setpage(6); setexpanded(false) }}>{isexpanded ? 'User-Details' : <PersonIcon />}</button>
                        <button onClick={() => {
                            localStorage.removeItem('token')
                            state.setToken(null)
                            navigate('/login')
                        }}>{isexpanded ? 'Logout' : <LogoutIcon />}</button>
                        <button className={`toggle-button`} onClick={() => setexpanded(!isexpanded)}>{isexpanded ? '<' : ">"}</button>
                    </div>
                </div>
                <div className="right">
                    {
                        page == 1 ? <Homes /> : page == 2 ? <Schedule /> : page == 3 ? <Todo /> : page == 4 ? <Notes /> : page == 6 ? <Dashboard /> : <Attendence />
                    }
                </div>
            </div>
        </>
    )
}

export default Home
