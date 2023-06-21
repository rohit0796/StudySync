import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../components/form.css'
import cross from './media/remove.png'
function Update(props) {
    const [data, setData] = useState([]);
    const getData = async () => {
        await fetch('/submit/update/' + props.ids,
            {
                method: "GET",
                headers:
                {
                    "Content-Type": "application/json"
                }

            }).then((x) => x.json()).then(dat => {
                console.log(dat)
                setData(dat);
            }).catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        getData();
    }, [])

    // console.log(data.name)

    // console.log(data)
    const postData = async (e) => {
        e.preventDefault();
        props.closeModal(false)
        const user = {
            name: e.target[0].value,
            redgno: e.target[1].value,
            email: e.target[2].value,
            dob: e.target[3].value,
            mob: e.target[4].value,
            branch: e.target[5].value,
            hobbies: e.target[7].value,
        }
        const res = await fetch('/submit/updates',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        const dat = await res.json()
        if (dat.status === 422 || !dat) { window.alert("invalid registration") }
        else {
            window.alert("Updated Successfully")
        }
    }

    return (
        <>
            <div className="container">
                <div className="cont">


                    <button onClick={() => {
                        props.closeModal(false)
                    }} className="but"><img src={cross} alt="X" /></button>
                    <div className="body">
                        <h1>Update form</h1>
                    </div>
                    <form method="POST" onSubmit={postData}>

                        <table className="tb" align="center" cellSpacing="10px">
                            <tr>
                                <td>Name:</td>
                                <td> <input type="text" placeholder="enter your name" id="name" name="name" defaultValue={data.name} /> </td>
                            </tr>
                            <tr>
                                <td>Regd no.</td>
                                <td> <input type="number" placeholder="enter your regd no" id="redg" name="redgno" defaultValue={data.redgno} /> </td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td> <input type="text" placeholder="enter your Email" id="mail" name="email" defaultValue={data.email} /> </td>
                            </tr>
                            <tr>
                                <td>Date of birth:</td>
                                <td> <input type="date" id="date" name="dob" defaultValue={data.dob} required /> </td>
                            </tr>
                            <tr>
                                <td>Mobile no:</td>
                                <td> <input type="text" placeholder="enter your mob no." id="mob" pattern="[7-9]{1}[0-9]{9}" name="mob" defaultValue={data.mob} /> </td>
                            </tr>
                            <tr>
                                {/* <td>Gender:</td>
                                <td>
                                    <input type="radio" name="gender" value="male" defaultValue={data.gender}/>
                                    <span>Male</span>
                                    <input type="radio" name="gender" value="female" defaultValue={data.gender}/>
                                    <span>Female</span>
                                    <input type="radio" name="gender" value="others" defaultValue={data.gender}/>
                                    <span>others</span>
                                </td> */}
                            </tr>
                            <tr>
                                <td>Branch:</td>
                                <td> <select id="branch" name="branch" >
                                    <option value="IT" >Information Technology</option>
                                    <option value="Mech" >Mechanical</option>
                                    <option value="CSE" >Computer Science</option>
                                    <option value="civil" >Civil engeneering</option>
                                    <option value="chem" >Chemical</option>
                                </select></td>
                            </tr>
                            <tr>
                                <td>Hobbies:</td>
                                <td>
                                    <input type="checkbox" value="singing" />
                                    <span>Singing</span><br />
                                    <input type="checkbox" value="dancing" />
                                    <span>Dancing</span><br />
                                    <input type="checkbox" value="acting" />
                                    <span>Acting</span><br />
                                    <input type="checkbox" value="cricket" />
                                    <span>cricket</span><br />
                                    <input type="checkbox" value="others" />
                                    <span>others</span> <br />
                                </td>
                            </tr>


                        </table>
                        <Div>
                            <button type="submit" className='submit'>Update</button>
                        </Div>
                    </form>
                </div>
            </div>
        </>
    )
}
const Div = styled.div`
text-align:center;
margin-bottom:8px;`
export default Update;
