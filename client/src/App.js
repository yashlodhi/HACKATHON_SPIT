import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Visualizations from "./Components/Visualizations/Visualizations";

function App() {
  useEffect(() => {
    let usersList = [];
    fetch("http://localhost:9000/getDashboardData")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((users) => {
        console.log(users)
        usersList = users.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <header>
        <nav>
          <div> <NavLink to="/dashboard" className="nav_elements"> Dashboard </NavLink> </div>
          <div> <NavLink to="/visualizations" className="nav_elements"> Visualizations </NavLink> </div>
        </nav>
      </header>

      <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route
          exact
          path="/visualizations"
          element={<Visualizations />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
