import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskItem = ({ task, toggleComplete, deleteTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDueTime, setEditedDueTime] = useState(task.dueTime);

    const handleToggle = () => {
        toggleComplete(task); // ✅ Pass the entire task
    };


    const handleSave = () => {
        editTask(task.id, editedTitle, editedDueTime);
        setIsEditing(false);
    };

    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <input type="checkbox" checked={task.completed} onChange={handleToggle} />
                {isEditing ? (
                    <>
                        <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                        <input type="datetime-local" value={editedDueTime} onChange={(e) => setEditedDueTime(e.target.value)} />
                        <button className="btn btn-sm btn-success ms-2" onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <span className={`ms-2 ${task.completed ? "text-decoration-line-through" : ""}`}>
                        {task.title} (Due: {new Date(task.dueTime).toLocaleString()}) - {task.status}
                    </span>
                )}
            </div>
            <div>
                {!isEditing && <button className="btn btn-warning btn-sm me-2" onClick={() => setIsEditing(true)}>Edit</button>}
                <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
            <ToastContainer position="top-right"
                autoClose={10000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                />
        </li>
    );
};

export default TaskItem;
