import React, { useState } from 'react';
import '../components/form.css'
import { useNavigate } from 'react-router';
import { ThreeDots } from 'react-loader-spinner';
function Form() {
    const navigate = useNavigate();
    const [isloading, setisloading] = useState(false)
    const [user, setUser] = useState({
        name: '',
        redgno: '',
        email: '',
        dob: '',
        mob: '',
        gender: '',
        branch: '',
        ProfilePhoto: null,
        password: '',
        cpassword: ''
    });

    const inputValue = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const filechange = (e) => {
        const { name, files } = e.target;
        setUser({ ...user, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault();
        setisloading(true)
        const { name, redgno, email, dob, mob, gender, branch, ProfilePhoto, password, cpassword } = user;

        if (name === '') {
            alert('Please fill in the name field');
        } else if (redgno === '') {
            alert('Please fill in the regd no. field');
        } else if (email === '') {
            alert('Please fill in the email field');
        } else if (dob === '') {
            alert('Please fill in the date of birth field');
        } else if (ProfilePhoto === null) {
            alert('Please provide a profile picture');
        } else if (mob === '') {
            alert('Please fill in the mobile no. field');
        } else if (cpassword !== password) {
            alert('Your password and confirm password inputs must be the same');
        } else {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('redgno', redgno);
            formData.append('email', email);
            formData.append('dob', dob);
            formData.append('mob', mob);
            formData.append('gender', gender);
            formData.append('branch', branch);
            formData.append('ProfilePhoto', ProfilePhoto);
            formData.append('password', password);

            try {
                const res = await fetch('/register', {
                    method: 'POST',
                    body: formData,
                });

                const data = await res.json();
                if (data.status === 422 || !data) {
                    window.alert('Email Already Exists');
                } else {
                    setisloading(false)
                    window.alert('Registration Successful');
                    navigate('/login');
                }
            } catch (error) {
                console.log(error);
                // Handle error
            }
        }
    };
    return (
        <>
            <div className="container">
                <div className="cont">
                    <div className="bodys">
                        {isloading ?
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
                            :
                            <>
                                <h1>Registration form</h1>
                                <form method="POST">

                                    <table className="tb" align="center" cellSpacing="10px">
                                        <tr>
                                            <td>Name:</td>
                                            <td> <input type="text" placeholder="enter your name" id="name" name="name" value={user.name} onChange={inputValue} required /> </td>
                                        </tr>
                                        <tr>
                                            <td>Regd no.</td>
                                            <td> <input type="number" placeholder="enter your regd no" id="redg" name="redgno" value={user.redgno} onChange={inputValue} required /> </td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td> <input type="text" placeholder="enter your Email" id="mail" name="email" value={user.email} onChange={inputValue} required /> </td>
                                        </tr>
                                        <tr>
                                            <td>Upload Dp:</td>
                                            <td className='dp'> <input type="file" name="ProfilePhoto" onChange={filechange} required /> </td>
                                        </tr>
                                        <tr>
                                            <td>Date of birth:</td>
                                            <td> <input type="date" id="date" value={user.dob} name="dob" onChange={inputValue} required /> </td>
                                        </tr>
                                        <tr>
                                            <td>Mobile no:</td>
                                            <td> <input type="text" placeholder="enter your mob no." id="mob" pattern="[7-8]{1}[0-9]{9}" name="mob" value={user.mob} onChange={inputValue} /> </td>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td>
                                                <input type="radio" name="gender" value="male" onChange={inputValue} />
                                                <span>Male</span>
                                                <input type="radio" name="gender" value="female" onChange={inputValue} />
                                                <span>Female</span>
                                                <input type="radio" name="gender" value="others" onChange={inputValue} />
                                                <span>others</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Branch:</td>
                                            <td> <select id="branch" name="branch" onChange={inputValue}>
                                                <option value=''>Select Branch</option>
                                                <option value="IT" onChange={inputValue} >Information Technology</option>
                                                <option value="Mech" onChange={inputValue}>Mechanical</option>
                                                <option value="CSE" onChange={inputValue}>Computer Science</option>
                                                <option value="civil" onChange={inputValue}>Civil engeneering</option>
                                                <option value="chem" onChange={inputValue}>Chemical</option>
                                            </select></td>
                                        </tr>
                                        <tr>
                                            <td>Password:</td>
                                            <td> <input type="password" placeholder="enter your password" value={user.password} onChange={inputValue} name="password" /> <br />
                                                <input type="password" placeholder="Confirm your password" value={user.cpassword} onChange={inputValue} name='cpassword' /> </td>
                                        </tr>
                                    </table>
                                    <div className="res">
                                        <p>Already Registered ? <a onClick={() => navigate('/login')}>Login</a></p>
                                        <button type="submit" className='submit' onClick={postData}>submit</button>
                                        <button type="reset" className='reset' onClick={() => navigate('/')}>Cancel</button>
                                    </div>
                                </form>
                            </>}

                    </div>
                </div>
            </div>
        </>
    )
}
export default Form;
