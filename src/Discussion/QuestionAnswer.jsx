import React, { useContext, useEffect, useState } from 'react'
import url from '../components/url'
import Context from '../Context/Context'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import toast, { Toaster } from 'react-hot-toast';
const QuestionAnswer = ({ questionId }) => {
    var arr = [];
    const { user, setpage } = useContext(Context)
    const [question, setQuestion] = useState()
    const [answers, setAnswers] = useState([])
    const [reply, setReply] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [isLike, setisLike] = useState(false)
    const [isOpenShow, setisOpenShow] = useState(false)
    const getData = () => {
        fetch(`${url}/get-questions/${questionId}`).then((val) => val.json()).then((data) => {
            setAnswers(data.data.answers)
            setQuestion(data.data);
        })
    }

    useEffect(() => {
        answers.map((ans) => arr.push(false))
        setisOpen(arr)
        setisOpenShow(arr)
    }, [answers])
    useEffect(() => {
        getData()
    }, [])

    const sendReply = (e) => {
        e.preventDefault();
        var message = e.target[0].value;
        if (message == '') {
            toast.error('please enter an answer');
            return
        }
        fetch(`${url}/send-answer/${questionId}`, {
            method: "POSt",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: message,
                repliedBy: user._id,
            })
        }).then(val => val.json()).then((res) => setAnswers(res.answers))
        e.target[0].value = '';
    }

    const postReply = (ans) => {
        if (reply == '') {
            toast.error('please enter an answer');
            return
        }
        ans.replies.push({
            content: reply,
            repliedBy: user._id
        })
        setReply("")
        fetch(`${url}/send-reply/${questionId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ans)
        }).then((val) => val.json()).then((data) => setAnswers(data.answers))
    }
    const deleteQuestion = () => {
        if (window.confirm("do you want delete this question?")) {
            fetch(`${url}/delete-question/${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((val) => val.json()).then((data) => {
                toast.success('deleted successfully')
                setpage(6)
            })
        }
    }
    return (
        <div className='question-wrapper'>
            <Toaster toastOptions={{
                style: {
                    border: '1px solid white',
                    padding: '16px',
                    color: 'white',
                    backgroundColor: '#0d0e23'
                },
            }} />
            <div className='Question-head'>
                <div className='dp-question'>
                    <div className="dp">
                        <img src={question && question.postedBy.image} alt="" />
                        <span>{question && question.postedBy.name}</span>
                    </div>
                    <p><strong>Q: </strong>{question && question.question}</p>
                </div>
                <div className="time">
                    <span>asked on - {question && question.createdAt.slice(0, 10) + "- " + question.createdAt.slice(11, 16)} </span>
                    {question && question.postedBy._id == user._id ? <button className='dark-button' onClick={deleteQuestion}> delete </button> : ''}
                </div>
            </div>
            {
                <div className="answers-cont">
                    {
                        answers.length == 0 ? <p>No Answers Yet !</p> :
                            answers && answers.map((ans, ind) => {
                                var a = [...isOpen];
                                var b = [...isOpenShow];
                                return (
                                    <>
                                        <div className="answers">
                                            <div className="ans-c">

                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: "center"
                                                }}> <span style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: "center"
                                                }}>
                                                        <button style={
                                                            {
                                                                background: "transparent",
                                                                border: 'none',
                                                                color: 'white',
                                                            }
                                                        }
                                                            onClick={() => setisLike(!isLike)}
                                                        >{isLike ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}</button>
                                                        <span>{ans.likes.count}</span>
                                                    </span>
                                                    <div className="postedby">
                                                        <div className="ud">
                                                            <img src={ans.repliedBy.image} alt="" />
                                                            <span>{ans.repliedBy.name}</span>
                                                        </div>
                                                        <p>{ans.content}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>{ans.createdAt.slice(0, 10) + "- " + ans.createdAt.slice(11, 16)}</span>
                                                    <button className='dark-button' onClick={() => {
                                                        a[ind] = !a[ind];
                                                        setisOpen(a)
                                                    }}>reply</button>
                                                    <button className='dark-button' onClick={() => {
                                                        b[ind] = !b[ind];
                                                        setisOpenShow(b)
                                                    }}>{b[ind] ? 'hide replies' : "show replies"}</button>
                                                    <p>{ans.replies.length} replies</p>
                                                </div>
                                            </div>
                                            {isOpen[ind] && <div className="reply">
                                                <input type="text" placeholder='enter your reply...' value={reply} onChange={(e) => setReply(e.target.value)} />
                                                <button className='dark-button' onClick={() => {
                                                    a[ind] = !a[ind];
                                                    setisOpen(a)
                                                }}>cancel</button>
                                                <button className='dark-button' onClick={() => postReply(ans)}>post</button>
                                            </div>}
                                            <div style={{
                                                overflow: 'auto',
                                                maxHeight: "250px"
                                            }}>

                                                {
                                                    ans.replies.length == 0 ? isOpenShow[ind] && <span>no replies yet.</span> :
                                                        isOpenShow[ind] && ans.replies.map((a) => {
                                                            return (
                                                                <>
                                                                    <div className="posted-by">
                                                                        <div className="ud">
                                                                            <img src={a.repliedBy.image} alt="" />
                                                                            <span>{a.repliedBy.name}</span>
                                                                        </div>
                                                                        <p>{a.content}</p>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                }
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                    }
                </div>
            }
            <form onSubmit={sendReply}>
                <div className="inputs">
                    <input type="text" placeholder='post an answer ...' />
                </div>
                <button className='dark-button reply-button' type='submit' >post</button>
            </form>
        </div>
    )
}

export default QuestionAnswer
