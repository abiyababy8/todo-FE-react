import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { getAllTasks, addTask, markTaskAsDone, deleteTask, updateTask } from "../services/allApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await getAllTasks();
            setTasks(response.data);
        } catch (error) {
            toast.error("Failed to fetch tasks.");
        }
    };

    const handleAddTask = async (task) => {
        try {
            await addTask(task);
            fetchTasks();
            toast.success("Task added!");
        } catch (error) {
            toast.error("Failed to add task.");
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            const updatedTask = {
                ...task, // ✅ Keep title and dueTime
                completed: !task.completed,
                status: task.completed ? "pending" : "done",
            };
    
            await markTaskAsDone(task.id, updatedTask);
            fetchTasks();
            toast.info(`Task marked as ${updatedTask.completed ? "done" : "pending"}`);
        } catch (error) {
            toast.error("Failed to update task.");
        }
    };
    

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
            toast.warn("Task deleted!");
        } catch (error) {
            toast.error("Failed to delete task.");
        }
    };

    const handleEditTask = async (id, title, dueTime) => {
        try {
            await updateTask(id, { title, dueTime });
            fetchTasks();
            toast.success("Task updated!");
        } catch (error) {
            toast.error("Failed to update task.");
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container mt-4">
            <h4>Add a Task:</h4>
            <TaskForm addTask={handleAddTask} />
            <ul className="list-group mt-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskItem key={task.id} task={task} toggleComplete={handleToggleComplete} deleteTask={handleDeleteTask} editTask={handleEditTask} />
                    ))
                ) : (
                    <li className="list-group-item text-center">No tasks available</li>
                )}
            </ul>
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
        </div>
    );
};

export default TaskList;
