import React, { useState, useEffect } from "react";
import axios from "axios";
//import Landing1 from "../Landing/Landing2";
import Landing from "../Landing";
import Loader from "../Sheared/Loader"
const PrivateRoute = ({ history }) => {
  const [error, setError] = useState("");
  const [privateInfo, setPrivateInfo] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchingPrivateInfos = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private-route", config);
        setPrivateInfo(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Authorization Invoked please login to continue");
      }
    };

    fetchingPrivateInfos();
  }, [history]);

  const favicon = document.getElementById("favicon");
  favicon.href = "https://twemoji.maxcdn.com/2/svg/1f513.svg";

  const handleOnClick = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  if (loading) {
    return <Loader/>
  }
  return error ? (
    <Landing />
  ) : (
    <>
      {/* <div style={{ background: "green", color: "white" }}>{privateInfo}</div> */}
      <Landing privateInfo={privateInfo} handleOnClick={handleOnClick} />
      {/* <button onClick={handleOnClick}>Logout</button> */}
    </>
  );
};

export default PrivateRoute;
