import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './todo.css'
import { ThreeDots } from 'react-loader-spinner';
const Todo = () => {
  const [todo, setTodo] = useState([])
  const getData = () => {
    fetch('/todo', {
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
    fetch('/todoupdate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(tod)
    }).then((val) => val.json()).then((dat) => console.log(dat));
    getData()
  }
  const Deletetodo = (ind) => {
    if (window.confirm('Sure you want to delete the todo') === true) {
      var tod = todo
      tod.splice(ind, 1)
      fetch('/todoupdate', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(tod)
      }).then((val) => val.json()).then((dat) => console.log(dat));
      getData()
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const to = {
      title: e.target[0].value,
      completed: false,
    }
    console.log(to)
    try {
      fetch('/add-todo', {
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
            alert('Todo Added')
          }
        })
    } catch (error) {
      console.log(error)
    }
    getData()
  }
  return (
    <div>
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
                <div className="lef">
                  <input type="checkbox" onChange={() => setChecked(ind)} checked={tod.completed ? true : false} /><span style={{ textDecoration: style }}>{tod.title}</span>
                </div>
                <div className="rig">
                  <button onClick={() => { Deletetodo(ind) }}><DeleteIcon /></button>
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
