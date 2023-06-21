import React, { useEffect, useState } from 'react'
import './display.css'
import edit from './media/edit.png'
import remove from './media/delete.png'
import Search from './Search';
import Header from './Header';
function Display({ setModal ,seId,setUpdatemod}) {
  const [user, setuser] = useState([]);
  const [search,changeSearch]=useState ("")
  // console.log(search)
  // const k = 9;
  // f(9);
  const getUser = async () => {
    await fetch('http://localhost:5000/submit',
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((x) => x.json()).then(data => {
        setuser(data);
      }).catch((err)=>{
        console.log(err)
      });
  }
 var keys=["name",'email','gender']
  useEffect(() => {
    getUser();
  }, [])
  const onDelete = (id) => {
    setModal(true);
    // console.log(id)
   seId(id);
  }
const onUpdate=(id)=>
{
  setUpdatemod(true);
  seId(id);

}
console.log()
  // const dt = new Date(user.dob)
  // console.log(dt);
  // user

  return (
    <>
    <Header/>
          <Search search={search} changeSearch={changeSearch}/>
      <div className='body'>
        <table className='table' align='center' cellSpacing="60px">
          {<tr>
            <th>Regd No.</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Mob</th>
            <th>email</th>
            <th>
Action
            </th>
          </tr>}
          {
            user.filter((item)=>
            keys.some((key)=> item[key].toLowerCase().includes(search))
            ).map((ele) => {
              const dt = new Date(ele.dob)
              let mon=dt.getMonth()+1;
              let day = dt.getDate();
              let yr = dt.getFullYear()
              return (
                <>
                  <tr>
                    <td>{ele.redgno}</td>
                    <td>{ele.name}</td>
                    <td>{day+'/'+mon+'/'+yr}</td>
                    <td>{ele.gender}</td>
                    <td>{ele.mob}</td>
                    <td>{ele.email}</td>
                    <td><button onClick={()=>{onUpdate(ele._id)}}><img src={edit} alt="edit" /></button>
                      <button onClick={() => { onDelete(ele._id) }}><img src={remove} alt="delete" /></button>
                    </td>
                  </tr>
                </>
              )
            })
          }
        </table>
      </div>
    </>
  )
}

export default Display
