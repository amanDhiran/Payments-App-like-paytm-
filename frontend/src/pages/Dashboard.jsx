import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState()
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState("")

  const navigate = useNavigate()

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


  //debouncing
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [filter]);

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
      
      <div className="mt-5 flex flex-col gap-4">
        {/* users */}
        <div className="text-xl font-bold">Users</div>
        {/* search */}
        <input type="text" className='rounded-md px-3 py-2 text-sm bg-primary border border-border' 
          onChange={(e) => {
            setFilter(e.target.value)  
          }} 
          placeholder="Search users..."/>
        {/* user list */}
        
        {users?.map((user) => (<div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-border rounded-[50%] flex flex-col justify-center">
                {user?.firstName[0].toUpperCase()}
              </div>
              <p>{user.firstName}</p>
            </div>
            <button 
              className="text-sm font-medium bg-secondary text-primary h-10 rounded-md hover:bg-hover px-3"
              onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
              >
              Send Money
            </button>
          </div>
        </div>))}
        
      </div>
    </div>
  );
}

export default Dashboard;
