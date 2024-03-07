import React, { useContext, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import url from '../components/url'
import './discussion.css'
import Context from '../Context/Context'
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
                    {
                        questions && questions.map((question, ind) => {
                            var date = question.createdAt.slice(0, 10)
                            date = date + "-  " + question.createdAt.slice(11, 16)
                            return (
                                <div className="questions" key={ind} onClick={() => handleQuestionSelect(question._id)}>
                                    <div className='question-detail'>
                                        <img src={question.postedBy.image} alt="" className='discusson-avatar' />
                                        <span><strong>{question.postedBy.name}</strong></span>
                                        <span>asked on: {date}</span>
                                    </div>
                                    <p>Q: {question.question}</p>
                                    <div className="time">
                                        <span>{question.answers.length} answers</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Discussion
