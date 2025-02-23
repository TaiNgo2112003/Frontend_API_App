import React from "react";

function TaskForm({ addTask, title, setTitle, description, setDescription }) {
  return (
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
  );
}

export default TaskForm;
