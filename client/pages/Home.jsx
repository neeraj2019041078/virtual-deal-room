// src/pages/Home.js
import React from 'react';
import Navbar from '../components/Navbar';
import './Home.css'; // Import the CSS

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to the Virtual Deal Room</h1>
        <p>Where buyers and sellers negotiate in real-time, securely and efficiently.</p>
      </div>
    </>
  );
};

export default Home;
