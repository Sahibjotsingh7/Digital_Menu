import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
//import jwtDecode from "jwt-decode"; // Import jwt-decode
import Menu from "./components/Menu";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css"; // Import CSS file
import logo from './assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        
        if (decoded.exp * 1000 < Date.now()) {
          // Token expired, remove it from localStorage
          localStorage.removeItem("adminToken");
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("adminToken"); // If token is malformed, remove it
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/admin/login");
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link">Menu</Link>
        <button className="admin-btn" onClick={handleAdminClick}>
          {isAdmin ? "Dashboard" : "Admin"}
        </button>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'x' : '☰'}
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
