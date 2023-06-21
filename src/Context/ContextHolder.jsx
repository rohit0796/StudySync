import React, { useEffect, useState } from 'react'
import Context from './Context'
const ContextHolder = (props) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    console.log(token)
    return (
        <Context.Provider value={{ token, setToken }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextHolder
