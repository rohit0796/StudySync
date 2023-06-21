import React from 'react'
import styled from 'styled-components'
const Delete = (props) => {

  const deleteData = async (id) => {
    const res = await fetch('/submit/delete',
      {
        method: 'POST',
        headers:
        {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({id})

      })
  }
  return (
    <>
      <Div>
        <Div2>
          <Cross onClick={() => { props.setModal(false) }}>X</Cross>
          <h4>Do You want to delete this ?</h4>
          <Button onClick={() => { props.setModal(false)}}>Cancel</Button>
          <Button onClick={() => { props.setModal(false);deleteData(props.ids)}}>confirm</Button>
        </Div2>
      </Div>
    </>
  )
}
const Button = styled.button`
margin:5px;
padding:6px;
border-radius:3px`
const Div = styled.div`
display:flex;
background:rgb(26, 23, 23);;
height:92vh;
justify-content:center;
align-items:center;
text-align:center;`
const Cross = styled.button`
float:right;
background:red;
color:white`
const Div2 = styled.div`
width:30%;
background:rgb(73, 68, 68) ; 
border-radius: 10px;
border: 2 solid black;
box-shadow: rgb(0, 0, 0,0.35) 0px 5px 15px;
padding: 5px 10px;`
export default Delete
