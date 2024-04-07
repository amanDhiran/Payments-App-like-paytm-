import React, { useState, useEffect } from "react";
import axios from "axios";
function Dashboard() {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/", {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-8 text-secondary">
      {/* header */}
      <div className=" flex items-center justify-between py-4 border-b-2 border-border">
        <h1 className="text-xl font-bold">
          Payments App
        </h1>
        <div className="flex text-lg gap-3 justify-between items-center">
          <p>Hello, {user?.firstName}</p>
          <div className="px-4 py-2 bg-border rounded-[50%] flex flex-col justify-center">{user?.firstName?.charAt(0)}</div>
        </div>
      </div>
      {/* balance */}
        <div className="mt-5 font-bold text-lg">
          Your balance <span className="font-normal ml-3">${balance?.toFixed(2)}</span>
        </div>
      {/* users */}
        {/* search */}
        {/* user list */}
    </div>
  );
}

export default Dashboard;
