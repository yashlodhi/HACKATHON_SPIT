import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Visualizations from "./Components/Visualizations/Visualizations";

function App() {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/getDashboardData")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok") ;  
        } 
        return response.json();
      })
      .then(async (result) => {
        result = result.map((user, index) => [1000+index, ...user]);
        setUsersList(result) ;
      })
      .catch((error) => {
        console.error("Error:", error) ;  
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
        <Route exact path="/" element={ <Dashboard usersList={usersList} />} />
        <Route exact path="/dashboard" element={ <Dashboard usersList={usersList} />} />
        <Route exact path="/visualizations" element={ <Visualizations />} />
      </Routes>
    </>
  );
}

export default App;
