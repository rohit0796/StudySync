import React, { useState } from 'react';
import './attendence.css'
const AddSubjectForm = ({ onSubjectAdded }) => {
    const [subjectName, setSubjectName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/add-subject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ name: subjectName }),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                // Call the callback function to notify the parent component
                onSubjectAdded(data.subjects);
                setSubjectName('');
            } else {
                console.error('Failed to add subject:', data.error);
            }
        } catch (error) {
            console.error('Error adding subject:', error);
        }
    };

    return (
        <div className="AddSub">
            <form onSubmit={handleSubmit}>
                <h5>Add Subject : </h5>
                <input
                    type="text"
                    placeholder="Subject Name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    required
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddSubjectForm;
