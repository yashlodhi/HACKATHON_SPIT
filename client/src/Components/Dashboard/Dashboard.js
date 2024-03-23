import { useEffect, useState } from "react";
import "./Dashboard.css";
import "./Switch.css";
import userImg from "./img.png";

function Dashboard({ usersList }) {
  const [filterByChurnPrediction, setFilterByChurnPrediction] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [displayedUser, setDisplayedUser] = useState([]);
  const [userDisplayID, setUserDisplayID] = useState(0);

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
      console.log("HERE");
    }
  }, [filterByChurnPrediction]);

  useEffect(() => {
    setDisplayedUser(filteredUsers.find((ele) => userDisplayID == ele[0]));
  }, [userDisplayID]);

  return (
    <div id="main_container">
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
              style={{
                backgroundColor: user[20] === "yes" ? "#f94144" : "#b0f2b4",
              }}
              onClick={() => setUserDisplayID(user[0])}
            >
              <img src={userImg} alt="User" />
              <span>User {user[0]}</span>
            </div>
          ))}
        </div>
      </aside>

      <div id="main_section">
        {displayedUser ? (
          <>
            <p><b>User ID:</b> {displayedUser[0]}</p>
            <p><b>State Code:</b> {displayedUser[1]}</p>
            <p><b>Subscribed to International plan</b> - {displayedUser[4]}</p>
            <p><b>Subscribed to voice mail plan</b> - {displayedUser[5]}</p>
            <p><b>Number of voice calls</b> - {displayedUser[6]}</p>
            <p><b>Number of daily calls</b> - {Math.floor(displayedUser[8]/10)}</p>
            <p><b>Daily charges($)</b> - {displayedUser[9]}</p>
            <p><b>{displayedUser[20] == "no" ? (<p style={{color: "#b0f2b4"}}>The user is unlikely to leave!</p>) : (<p style={{color: "#f94144"}}>The user will probably leave!</p>)}</b></p>
            
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
