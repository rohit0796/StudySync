import React, { useState } from 'react';
import '../components/form.css'
import { useNavigate } from 'react-router';
import { ThreeDots } from 'react-loader-spinner';
import url from './url';
import AvatarModal from './AvatarModal'
import toast, { Toaster } from 'react-hot-toast';
function Form() {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isloading, setisloading] = useState(false)
    const [user, setUser] = useState({
        name: '',
        redgno: '',
        email: '',
        dob: '',
        mob: '',
        gender: '',
        branch: '',
        image: null,
        password: '',
        cpassword: ''
    });

    const inputValue = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        const { name, redgno, email, dob, mob, gender, branch, image, password, cpassword } = user;
        if (name === '') {
            alert('Please fill in the name field');
        } else if (redgno === '') {
            alert('Please fill in the regd no. field');
        } else if (email === '') {
            alert('Please fill in the email field');
        } else if (dob === '') {
            alert('Please fill in the date of birth field');
        }
        else if (image === null) {
            image = "https://avatar.iran.liara.run/public/46"
        }
        else if (mob === '') {
            alert('Please fill in the mobile no. field');
        } else if (password == '' || cpassword !== password) {
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
            formData.append('image', image);
            formData.append('password', password);
            setisloading(true)
            try {
                const res = await fetch(`${url}/register`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user),
                });

                const data = await res.json();
                console.log(data)
                if (data.error) {
                    window.alert(data.error);
                    setisloading(false)
                } else {
                    setisloading(false)
                    toast('Registration Successful');
                    navigate('/login');
                }
            } catch (error) {
                setisloading(false)
                toast('Something Went Wrong !!')
                console.log(error);
                // Handle error
            }
        }
    };
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
                                            <td>Choose Avatar:</td>
                                            <td className='dp'> <button onClick={handleOpen} className='submit'>Choose</button> </td>
                                            <AvatarModal handleClose={handleClose} user={user} setUser={setUser} open={open} />
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
