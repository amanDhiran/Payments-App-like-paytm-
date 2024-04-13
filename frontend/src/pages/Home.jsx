import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [initialized, setInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
        setInitialized(true);
      });
  }, []);

  if (!initialized) {
    return <div>Loading...</div>;
  }
  if (!isLoggedIn) {
    return navigate("/signup");
  }
  return navigate("/dashboard");
}

export default Home;
