import React from 'react'
import './attendence.css'
const FullAttendance = ({ subject }) => {
    return (
        <div className='FullAtt-cont'>
            <div className="header">
                <h3>{subject.name}</h3>
            </div>
            <div className="fullat">
                <span>Date</span>
                <span>Status</span>
            </div>
            {
                subject && subject.attendance.map((ele) => {
                    return (
                        <div className="fullatt">
                            <span>{ele.date.slice(0,10)}</span>
                            <span>
                                {ele.status}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FullAttendance
