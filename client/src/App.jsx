import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";

import CreateDeal from "../pages/CreateDeal";
import Home from "../pages/Home";
import AllDeals from "../pages/AllDeals";

const App = () => {
  return (
    <>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vrr" element={<CreateDeal />} />
            <Route path="/deals" element={<AllDeals />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
