import React, { useState, useEffect } from "react";
import "./Header.css";

function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; 
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode); 
  }, [darkMode]);

  return (
    <nav className="topbar">
      <div className="logo">📝 Task Manager</div>

      <div className="nav-container">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/">Trang chủ</a></li>
          <li><a href="/tasks">Danh sách Task</a></li>
          <li><a href="/login">Đăng nhập</a></li>
          <li><a href="/register">Đăng ký</a></li>
        </ul>

        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Header;
