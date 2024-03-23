// import {useState} from 'react' ;
import { useState, useEffect } from "react";
import "./Dashboard.css";
import "./Switch.css";

function Dashboard() {
  const [filterByChurnPrediction, setFilterByChurnPrediction] = useState(false);
  useEffect( ()=>{
    const checkBox = document.querySelector('#checkBox') ; 
    checkBox.addEventListener('click', ()=>{ 
        if(checkBox.checked)  setFilterByChurnPrediction(true);
        else setFilterByChurnPrediction(false); 
    })
  }, []); 
  
  

  return (
    <>

      <aside>
        <div className="filters">
          <input type="text" id="searchBox" placeholder="Seacrh by ID" />
        </div>
        <div className="filters">
          <span>Show Churn Prone Only : </span>
          <label className="switch">
            <input type="checkbox" id="checkBox"/>
            <span className="slider round"></span>
          </label>
        </div>

        <div id="users_list">

        </div>
      </aside>

    </>
  );
}

export default Dashboard;
