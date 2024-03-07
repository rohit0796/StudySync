import React, {  useState } from 'react'
import Context from './Context'
const ContextHolder = (props) => {
    const [page, setpage] = useState(1)
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [questionId, setQuestionId] = useState();
    return (
        <Context.Provider value={{
            token,
            setToken,
            user,
            setUser,
            page,
            setpage,
            questionId,
            setQuestionId
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextHolder
