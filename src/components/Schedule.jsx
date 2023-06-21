import React, { useEffect, useRef, useState } from 'react'
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import interactionPlugin from "@fullcalendar/interaction";
import './schedule.css'
import { ThreeDots } from 'react-loader-spinner';

const Schedule = () => {

    const [events, setEvents] = useState([])
    const getData = async () => {
        try {
            const response = await fetch('/submit', {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            setEvents(data.user.events);
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const DeleteEvent = async (ind) => {
        console.log(ind)
        const arr = events
        arr.splice(ind, 1);

        try {
            const response = await fetch('/delete-event', {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arr),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                window.alert('Event deleted successfully');
                // Update the events in the state or perform any necessary actions
            } else {
                window.alert('Failed to add event');
            }
        } catch (error) {
            console.log(error)
        }
        getData()
    }
    const handleEventAdd = async (eventInfo) => {
        eventInfo.preventDefault();
        const title = eventInfo.target[0].value;
        const start = eventInfo.target[1].value;
        const end = eventInfo.target[2].value;

        // Create the new event object
        const newEvent = {
            title: title,
            start: start,
            end: end,
        };

        try {
            const response = await fetch('/add-event', {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                window.alert('Event added successfully');
                // Update the events in the state or perform any necessary actions
            } else {
                window.alert('Failed to add event');
            }
        } catch (error) {
            console.error('Error adding event:', error);
        }
        getData()
    };

    return (
        <>
            <div className="header">
                <h1>Calender</h1>
            </div>
            <div className="calender-cont">
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    headerToolbar={{
                        start: "prev,next",
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    height={'70vh'}
                />
            </div>
            <div className="add-event">
                <form onSubmit={handleEventAdd}>
                    <p style={{
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        margin: 0
                    }}>Add an Event</p>
                    <input type="text" name="title" className='input' placeholder='Enter the tilte..' required/> <br />
                    <span>start:</span> <input type="datetime-local" name="" id="" />
                    <span>end:</span> <input type="datetime-local" name="" id="" /> <br />
                    <button type='submit' className='subButton'>Add</button>
                </form>
                <div className="event-cont">
                    {
                        events.map((event, ind) => {
                            return (
                                <div className="event" key={ind}>
                                    <div className="he">
                                        <EventIcon />
                                        <span style={{ marginLeft: '5px' }}>{event.title}</span><br />
                                    </div>
                                    <div className="dates">
                                        <span>start: {event.start}</span><br />
                                        <span>end: {event.end}</span>
                                    </div>
                                    <div className="del">
                                        <button
                                            onClick={() => {
                                                DeleteEvent(ind);
                                            }}><DeleteIcon /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Schedule
