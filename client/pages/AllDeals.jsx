import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllDeals.css"; // ✅ Import CSS
import {useNavigate} from "react-router-dom";

const AllDeals = () => {
  const [deals, setDeals] = useState([]);
  const navigate=useNavigate();
  const handleClick=(e)=>{
    e.preventDefault();
    navigate("/");
  }

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:2000/api/deals/deals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Fetched deals:", res.data);
        setDeals(res.data.deals);
      } catch (err) {
        console.error("Failed to fetch deals", err);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="all-deals-container">
      <h2>Available Deals</h2>
      <button className="logout-button" onClick={handleClick}>Logout</button>
      {deals.length === 0 ? (
        <p>No deals found.</p>
      ) : (
        deals.map((deal) => (
          <div key={deal._id} className="deal-card">
            <h3>{deal.title}</h3>
            <p><strong>Description:</strong> {deal.description}</p>
            <p><strong>Price:</strong> ₹{deal.price}</p>
            <p><strong>Status:</strong> {deal.status}</p>
            <p><strong>Seller:</strong> {deal.seller?.username}</p>
            {deal.filePath && (
              <img
                src={`http://localhost:2000/${deal.filePath}`}
                alt="deal"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllDeals;
