import React, { useState } from 'react';
import '../components/form.css'
import cross from './media/remove.png'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import Context from '../Context/Context';
import { ThreeDots } from 'react-loader-spinner';
import url from './url';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    if (token) {
        navigate('/home')
    }
    const state = useContext(Context)
    const [isloading, setisloading] = useState(false)
    const [user, setUser] = useState(
        { email: '', password: '' }
    )
    let name, value;
    const inputValue = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value });
    }
    const postData = async (e) => {
        e.preventDefault();
        setisloading(true)
        const { email, password } = user;
        if (email == '') {
            toast("please fill the email feild")
        }
        else if (password === '') {
            toast("Please fill the password")
        }

        else {
            try {
                const res = await fetch(`${url}/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email, password
                    })

                })
                const data = await res.json()
                if (data.status === 'error' || !data) {
                    toast("Invalid credentials");
                    setisloading(false)
                }
                else {
                    setisloading(false)
                    toast("Login Successfull")
                    state.setToken(data.user)
                    localStorage.setItem('token', data.user)
                    navigate('/home')
                }
            }
            catch (err) {
                console.log(err)
            }
        }
    }

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
                        {
                            isloading ?
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
                                    <h1>Login</h1>
                                    <form method="POST">
                                        <table className="tb" align="center" cellSpacing="10px">
                                            <tr>
                                                <td>Email:</td>
                                                <td> <input type="text" placeholder="enter your Email" id="mail" name="email" value={user.email} onChange={inputValue} required /> </td>
                                            </tr>
                                            <tr>
                                                <td>Password:</td>
                                                <td> <input type="password" placeholder="enter your password" value={user.password} onChange={inputValue} name="password" /> </td>
                                            </tr>
                                        </table>
                                        <div className="res">
                                            <p>Don't have an account? <a onClick={() => navigate('/register')}>Register</a></p>
                                            <button type="submit" className='submit' onClick={postData}>LOGIN</button>
                                        </div>
                                    </form>
                                </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
