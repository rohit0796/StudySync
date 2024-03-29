import React, { useContext, useEffect } from 'react'
import './home.css'
import Fullcalendar from "@fullcalendar/react";
import {  ThreeDots } from 'react-loader-spinner'
import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
import url from './url';
import Context from '../Context/Context';
const Homes = () => {
    // const [user, SetUser] = useState()
    const { user, setUser } = useContext(Context)
    const getData = () => {
        fetch(`${url}/todo`, {
            method: "GET",
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((dat) => dat.json()).then((val) => setUser(val.data))
    }
    useEffect(() => {
        getData()
    }, [])

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
            <div className='user-det'>
                <div className="user-top">
                    <div className="photo" style={{
                        backgroundImage: `url(${user.image})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    </div>
                    <div className="text">
                        <div className='Name'>Hello {user ? user.name : ""}</div>
                        <div>Email: {user ? user.email : ""}</div>
                        <div>Branch: {user ? user.branch : ""}</div>
                    </div>
                </div>
                <div className="user-bottom">
                    <div className="home-event">
                        <div className="header">
                            <h2>Events</h2>
                        </div>
                        <Fullcalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={user.events}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            height={'50vh'}
                        />
                    </div>
                    <div className="home-right">
                        <div className="home-todo">
                            <div className="header">
                                <h2>To-dos</h2>
                            </div>
                            <div className="tcont">
                                {
                                    user.todos.filter((ele) => ele.completed === false).map((todo) => <div className='todos'>{todo.title}</div>)
                                }
                            </div>
                        </div>
                        <div className="home-att">
                            <div className="header"><h3>Attendance{' < '}75% </h3></div>
                            <div className="att-cont">
                                {
                                    user.subjects.map((subject, ind) => {
                                        var totalClass = user.subjects[ind].attendance.length
                                        var newarr = user && user.subjects[ind].attendance.filter((ele) => ele.status === 'present')
                                        var present = newarr.length
                                        const att = (present / totalClass) * 100
                                        if (att < 75) {

                                            return (
                                                <div key={ind} style={{
                                                    margin: '0 10px'
                                                }} >
                                                    <div className="percent">
                                                        {att ? att.toFixed(2) : 0}%
                                                    </div>
                                                    <span>{subject && subject.name}</span>
                                                </div>
                                            )
                                        }
                                        else {
                                            return <></>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

export default Homes
