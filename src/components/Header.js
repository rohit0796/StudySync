import React from 'react'
import { useNavigate } from 'react-router';
import styled from "styled-components";

function Header() {
    const navigate = useNavigate()
    return (

        <Container>
            <H1>
                students details
            </H1>
            <div>
                
                <Button onClick={()=>{
                    navigate('/register')
                }} > <b>Create Profile</b></Button>
            </div>
        </Container>
         

    )
}

const Container = styled.div`
display:flex;
justify-content:space-between;
border:2px solid black;
padding:12px;
background: black
`;
const Button = styled.button`
margin:5px;
border-radius:9px;
padding:7px;`
 const H1 = styled.h1`
 margin:4px;`
 
export default Header;