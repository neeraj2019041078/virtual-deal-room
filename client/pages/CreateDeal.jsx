import React, { useState } from 'react';
import axios from 'axios';
import './CreateDeal.css'; 
import {useNavigate} from "react-router-dom";

const CreateDeal = () => {
  const navigate=useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    if (form.file) {
      formData.append('file', form.file);
    }

    try {
      const res = await axios.post('http://localhost:2000/api/deals/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Deal created successfully');
      setForm({ title: '', description: '', price: '', file: null });
    } catch (err) {
      console.error(err);
      alert('Failed to create deal');
    }
  };

  const handleLog=(e)=>{
    e.preventDefault();
    navigate("/");
  }
  return (
    <div className="create-deal-container">
      <h2>Create Deal</h2> 
      <button onClick={handleLog}>Logout</button>
      <form className="create-deal-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={form.title} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} required />
        <input name="price" type="number" placeholder="Price" onChange={handleChange} value={form.price} required />
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Create Deal</button>
      </form>

    </div>
  );
};

export default CreateDeal;
