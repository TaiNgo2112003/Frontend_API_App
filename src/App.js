import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header/Header"; 
import TaskList from "./components/Container/TaskList"; 
import TaskForm from "./components/Container/TaskForm"; 

const API_URL = "https://backendapiapp-production.up.railway.app/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  // Get Task
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Lỗi: API không trả về mảng hợp lệ", response.data);
        setTasks([]); 
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
      setTasks([]); 
    }
  };

  // Add Task
  const addTask = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Tiêu đề và mô tả task không được để trống!");
      return;
    }
    try {
      const response = await axios.post(API_URL, { title, description });
      if (response.data && response.data.id) {
        setTasks([...tasks, response.data]);
        setTitle(""); 
        setDescription("");
      } else {
        console.error("Lỗi: API trả về dữ liệu không hợp lệ", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi thêm công việc:", error);
    }
  };

  // Update Task
  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Lỗi khi cập nhật công việc:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if (!isConfirmed) return; 
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks(); // Gọi lại API để cập nhật danh sách
    } catch (error) {
      console.error("Lỗi khi xóa công việc:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <h1>📌 Quản lý Công việc</h1>

        <TaskForm 
          addTask={addTask} 
          title={title} 
          setTitle={setTitle} 
          description={description} 
          setDescription={setDescription} 
        />


      </div>
      <TaskList 
          tasks={tasks} 
          toggleTaskCompletion={toggleTaskCompletion} 
          deleteTask={deleteTask} 
        />
    </>
  ); 
}

export default App;
