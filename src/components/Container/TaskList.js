import React from "react";
import "./TaskList.css"; 

function TaskList({ tasks, toggleTaskCompletion, deleteTask }) {
  return (
    <div className="task-container">
      <h2>📋 Danh sách Công việc</h2>

      {tasks.length === 0 ? (
        <p className="no-task">Chưa có công việc nào! ✨</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Trạng thái</th>
              <th>Tiêu đề</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className={task.completed ? "completed" : ""}>
                <td onClick={() => toggleTaskCompletion(task.id, task.completed)}>
                  {task.completed ? "✅ Hoàn thành" : "⬜ Chưa xong"}
                </td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>❌ Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
