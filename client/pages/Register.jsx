import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Register.css'; // Import the CSS file

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'seller'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password, role } = form;

      const res = await axios.post("http://localhost:2000/api/auth/regi", {
        username,
        email,
        password,
        role
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 201 || res.status === 200) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong during registration.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="register-form">
      <h2>Register</h2>
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <select name="role" onChange={handleChange} value={form.role}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Register;
