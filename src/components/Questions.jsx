import React from 'react'

const Questions = ({questions, handleQuestionSelect}) => {
    console.log(questions)
    return (
        <>
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
        </>
    )
}

export default Questions
