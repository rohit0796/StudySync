import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import url from '../components/url'
import './discussion.css'
import Context from '../Context/Context'
import Questions from '../components/Questions'
const Discussion = () => {
    const { user, setpage, setQuestionId } = useContext(Context)
    const [questions, setQuestions] = useState([])
    const getData = () => {
        fetch(`${url}/get-questions`).then((val) => val.json()).then((data) => {
            setQuestions(data.data)
        })
    }
    useEffect(() => {
        getData()
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const question = e.target[0].value;
        if (question === '') {
            toast.error("please enter a question");
            return
        }
        fetch(`${url}/create-Question`, {
            method: 'post',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                question,
                user: user._id
            })
        }).then((val) => val.json()).then((data) => {
            setQuestions((question) => [...question, data.data])
            toast.success("Question Posted Successfully !")
            e.target[0].value = "";
        })
    }

    const handleQuestionSelect = (id) => {
        setpage(8)
        setQuestionId(id)
    }
    return (
        <div style={{
            width: '100%',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <Toaster toastOptions={{
                style: {
                    border: '1px solid white',
                    padding: '16px',
                    color: 'white',
                    backgroundColor: '#0d0e23'
                },
            }} />
            <div className="header">
                <h1>Discussion Forum</h1>
            </div>
            <div className="todo-cont">
                <form onSubmit={handleSubmit} >
                    <textarea cols={50} rows={4} placeholder='Ask Questions here...' />
                    <button type='submit' className='todoSubmit'>Add</button>
                </form>
                <div className="question-cont">
                    <Questions questions={questions}
                        handleQuestionSelect={handleQuestionSelect} />
                </div>
            </div>
        </div>
    )
}

export default Discussion
