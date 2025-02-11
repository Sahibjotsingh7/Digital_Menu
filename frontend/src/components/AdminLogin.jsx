import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "../App.css"; // Import CSS for styling

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {  
      const response = await axios.post("https://digital-menu-02y6.onrender.com/api/auth/admin/login", credentials);
      localStorage.setItem("adminToken", response.data.token); // Store token
      navigate("/admin/dashboard"); 
    } catch (err) {
      console.log(err)  
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={credentials.username} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={credentials.password} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p style={{color:"red"}}>note: for admin use only</p>
    </div>
  );
};

export default AdminLogin;
