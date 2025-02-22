import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8080/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Lấy danh sách công việc từ API
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);

      // Kiểm tra dữ liệu API trước khi cập nhật state
      if (response.data && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Lỗi: API không trả về mảng hợp lệ", response.data);
        setTasks([]); // Để tránh lỗi khi render
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách công việc:", error);
      setTasks([]); // Nếu API lỗi, tránh lỗi khi render
    }
  };

  // Thêm công việc mới
  const addTask = async () => {
    if (!title.trim()) {
      alert("Tiêu đề không được để trống!");
      return;
    }

    try {
      const response = await axios.post(API_URL, { title, description });

      // Kiểm tra API phản hồi hợp lệ
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

  // Cập nhật trạng thái hoàn thành
  const toggleTaskCompletion = async (id, completed, title) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { 
        completed: !completed, 
        //title 
      });
  
      // Cập nhật lại danh sách task với dữ liệu từ server
      setTasks(tasks.map((task) => 
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error("Lỗi khi cập nhật công việc:", error);
    }
  };
  

  // Xóa công việc
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if (!isConfirmed) return; // Nếu người dùng không đồng ý thì dừng lại

    try {
      await axios.delete(`${API_URL}/${id}`);
      
      // Gọi lại API để đảm bảo dữ liệu đồng bộ với backend
      fetchTasks();
    } catch (error) {
      console.error("Lỗi khi xóa công việc:", error);
    }
  };

  

  return (
    <div className="container">
      <h1>📌 Quản lý Công việc</h1>

      {/* Form thêm công việc */}
      <div className="add-task">
        <input
          type="text"
          placeholder="Tiêu đề công việc"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mô tả công việc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>➕ Thêm</button>
      </div>

      {/* Danh sách công việc */}
      <ul className="task-list">
        {tasks.length === 0 ? (
          <p>Chưa có công việc nào! ✨</p>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <span onClick={() => toggleTaskCompletion(task.id, task.completed)}>
                {task.completed ? "✅" : "⬜"} {task.title}
              </span>
              <button className="delete" onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
