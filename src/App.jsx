import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="container py-4">
      <button className="btn btn-outline-primary mb-3" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <h1 className="text-center">To-Do List</h1>
      <TaskList />
    </div>
  );
}

export default App;
