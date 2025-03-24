import { useState } from "react";

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [dueTime, setDueTime] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !dueTime) return;
        addTask({ title, dueTime, completed: false, status: "pending" });
        setTitle("");
        setDueTime("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="d-flex">
                <input type="text" className="form-control ms-5" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '400px' }} />
                <input type="datetime-local" className="form-control ms-3 me-5" value={dueTime} onChange={(e) => setDueTime(e.target.value)} style={{ width: '300px' }} />
                <button className="btn btn-success" type="submit" style={{ width: '100px' }}>Add</button>
            </div>
        </form>
    );
}

export default TaskForm;
