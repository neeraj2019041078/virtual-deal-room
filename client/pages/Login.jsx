import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css'; // Import the CSS file

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = form;

      const res = await axios.post("http://localhost:2000/api/auth/logi", {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200 && res.data.token) {
        localStorage.setItem("token", res.data.token);
        alert("Login successful!");
      
        if (res.data.user.role === "buyer") {
          navigate("/deals");
        } else {
          navigate("/vrr"); // or whatever route seller should go to
        }
      } else {
        alert(res.data.message || "Login failed");
      }
     
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong during login.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
