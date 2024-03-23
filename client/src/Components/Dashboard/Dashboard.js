import { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Switch.css";
import userImg from "./img.png";

function Dashboard({ usersList }) {
  const [filterByChurnPrediction, setFilterByChurnPrediction] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(usersList);
  }, [usersList]);

  const handleCheckboxChange = () => {
    setFilterByChurnPrediction(!filterByChurnPrediction);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (filterByChurnPrediction) {
      const list = usersList.filter((user) => {
        if (user[20].trim() == "yes") {
          return true;
        }
        return false;
      });
      setFilteredUsers(list);
    } else {
      setFilteredUsers(usersList);
      console.log("HERE")
    }
  }, [filterByChurnPrediction]);

  useEffect(() => {
    console.log(filteredUsers.length);
  }, [filteredUsers]);

  return (
    <aside>
      <div className="filters">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          placeholder="Search by ID"
          id="searchBox"
        />
      </div>
      <div className="filters">
        <span>Show Churn Prone Only : </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={filterByChurnPrediction}
            onChange={handleCheckboxChange}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div id="users_list">
        {filteredUsers.map((user) => (
          <div
            className="user"
            key={user[0]}
            style={{ backgroundColor: user[20] === "yes" ? "#f94144" : "#b0f2b4" }}
          >
            <img src={userImg} alt="User" />
            <span>User {user[0]}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Dashboard;
