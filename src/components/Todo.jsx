import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './todo.css'
import { ThreeDots } from 'react-loader-spinner';
import url from './url';
import toast, { Toaster } from 'react-hot-toast';
const Todo = () => {
  const [todo, setTodo] = useState([])
  const getData = () => {
    fetch(`${url}/todo`, {
      method: "GET",
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((dat) => dat.json()).then((val) => setTodo(val.data.todos))
  }
  useEffect(() => {
    getData()
  }, [])

  const setChecked = (ind) => {
    var tod = todo
    tod[ind].completed = !tod[ind].completed;
    fetch(`${url}/todoupdate`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(tod)
    }).then((val) => val.json()).then((dat) => setTodo(dat.data.todos));

  }


  const Deletetodo = (ind) => {
    if (window.confirm('Sure you want to delete the todo') === true) {
      var tod = todo
      tod.splice(ind, 1)
      fetch(`${url}/todoupdate`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(tod)
      }).then((val) => val.json()).then((dat) => { setTodo(dat.data.todos) });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const to = {
      title: e.target[0].value,
      completed: false,
    }
    e.target[0].value = "";
    try {
      fetch(`${url}/add-todo`, {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(to)
      })
        .then((dat) => dat.json())
        .then((val) => {
          if (val) {
            toast('Todo Added')
            setTodo([...todo, to])
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <Toaster toastOptions={{
        style: {
          border: '1px solid white',
          padding: '16px',
          color: 'white',
          backgroundColor: '#0d0e23'
        },
      }} />
      <div className="header">
        <h1>To-Do</h1>
      </div>
      <div className="todo-cont">
        <form onSubmit={handleSubmit} >
          <input type="text" name="todo" placeholder='Enter To-do' required />
          <button type='submit' className='todoSubmit'>Add</button>
        </form>
        {todo.length == 0 ?
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            You Don't have anything here Yet
          </div>
          :
          todo.map((tod, ind) => {
            const style = tod.completed ? 'line-through' : 'none'
            return (
              <div className="todos" key={ind}>
                <div className="lef" onClick={() => setChecked(ind)} >
                  <input type="checkbox" onChange={() => setChecked(ind)} checked={tod.completed ? true : false} /><span style={{ textDecoration: style }}>{tod.title}</span>
                </div>
                <div className="rig">
                  <button className='del' onClick={() => { Deletetodo(ind) }}><DeleteIcon /></button>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Todo
