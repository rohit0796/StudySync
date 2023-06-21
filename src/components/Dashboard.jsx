import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import './dashboard.css'
import Context from '../Context/Context';
import user from '../components/media/user.png'
import { ThreeDots } from 'react-loader-spinner';
import url from './url';
const Dashboard = () => {
    const [updated, setUpdated] = useState(true)
    const state = useContext(Context);
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    async function getData() {
        try {
            const response = await fetch(`${url}/submit`, {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            const data = await response.json();
            setUser(data.user);
            const dt = new Date(data.user.dob);
            let mon = dt.getMonth() + 1;
            let day = dt.getDate();
            let yr = dt.getFullYear();
            const formattedDate = `${yr}-${mon < 10 ? '0' + mon : mon}-${day < 10 ? '0' + day : day}`;
            setDate(formattedDate);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    const postData = async () => {
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('redgno', user.redgno);
        formData.append('email', user.email);
        formData.append('dob', user.dob);
        formData.append('mob', user.mob);
        formData.append('gender', user.gender);
        formData.append('branch', user.branch);
        formData.append('ProfilePhoto', user.ProfilePhoto);
        formData.append('password', user.password);

        try {
            const response = await fetch(`${url}/submit/updates`, {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
                body: formData,
            });

            const data = await response.json();
            if (data.status === 422 || !data) {
                window.alert('Invalid registration');
            } else {
                window.alert('Updated successfully');
            }
            toggleEditMode();
        } catch (error) {
            console.error('Error updating user data:', error);
        }
        setUpdated(!updated)
    };


    useEffect(() => {
        if (!state.token) {
            navigate('/login');
        } else {
            getData();
        }
    }, [updated]);

    const getImageSrc = () => {
        if (user.image && user.image.data) {
            const base64String = btoa(
                String.fromCharCode(...new Uint8Array(user.image.data.data))
            );
            return `data:${user.image.contentType};base64,${base64String}`;
        }
        return user;
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
            <div className='det-cont'>
                <div className="header">
                    <h1>User Details</h1>
                </div>
                <div className="details">

                    <div className='photos' style={{
                        backgroundImage: `url(${getImageSrc()})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    </div>
                    {isEditMode ? (
                        <input type="file" name='ProfilePhoto' onChange={(e) => setUser({ ...user, ['ProfilePhoto']: e.target.files[0] })} />
                    ) : (
                        <></>
                    )}
                    <div>
                        {isEditMode ? (
                            <input type="text" value={user.name || ''} onChange={(e) => setUser({ ...user, name: e.target.value })} className='User-Name' />
                        ) : (
                            <div className="header"><h2>{user.name}</h2></div>
                        )}
                    </div>
                    <div className="dettCont">

                        <div className="dett">
                            <span>Registration No:</span>
                            <div className="content">
                                {isEditMode ? (
                                    <input type="text" value={user.redgno || ''} onChange={(e) => setUser({ ...user, redgno: e.target.value })} />
                                ) : (
                                    <span>{user.redgno}</span>
                                )}
                            </div>
                        </div>
                        <div className="dett">
                            <span>Email:</span>
                            <div className="content">
                                {isEditMode ? (
                                    <input type="text" value={user.email || ''} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                                ) : (
                                    <span>{user.email}</span>
                                )}
                            </div>
                        </div>
                        <div className="dett">
                            <span>Mobile:</span>
                            <div className="content">
                                {isEditMode ? (
                                    <input type="text" value={user.mob || ''} onChange={(e) => setUser({ ...user, mob: e.target.value })} />
                                ) : (
                                    <span>{user.mob}</span>
                                )}
                            </div>
                        </div>
                        <div className="dett">
                            <span>Date of Birth:</span>
                            <div className="content">
                                {isEditMode ? (
                                    <input type="date" value={date || ''} onChange={(e) => setDate(e.target.value)} />
                                ) : (
                                    <span>{date}</span>
                                )}
                            </div>
                        </div>
                        <div className="dett">
                            <span>Gender:</span>
                            <div className="content">
                                {isEditMode ? (
                                    <div className='re'>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={user.gender === 'male'}
                                            onChange={() => setUser({ ...user, gender: 'male' })}
                                        />
                                        <span>Male</span>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={user.gender === 'female'}
                                            onChange={() => setUser({ ...user, gender: 'female' })}
                                        />
                                        <span>Female</span>
                                    </div>
                                ) : (
                                    <span>{user.gender}</span>
                                )}
                            </div>
                        </div>
                        <div className="dett">
                            <span>Branch:</span>
                            <div className="content">
                                {isEditMode ? (
                                    <select
                                        id="branch"
                                        name="branch"
                                        value={user.branch || ''}
                                        onChange={(e) => setUser({ ...user, branch: e.target.value })}
                                    >
                                        <option value="IT">Information Technology</option>
                                        <option value="Mechanical">Mechanical</option>
                                        <option value="CSE">Computer Science</option>
                                        <option value="Civil">Civil Engineering</option>
                                        <option value="Chemical">Chemical</option>
                                    </select>
                                ) : (
                                    <span>{user.branch}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={isEditMode ? postData : toggleEditMode}>{isEditMode ? 'SAVE' : 'EDIT'}</button>
                </div>
            </div>
        );
};

export default Dashboard;
