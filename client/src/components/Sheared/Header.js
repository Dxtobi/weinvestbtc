import React,
{ useState, useEffect }
  from "react";
import { CgMenuRight } from 'react-icons/cg';
import Navemenu from './Navemenu'
import Navemenu1 from './Navmenu'
import axios from "axios";
import "./header.css";
import { useHistory } from "react-router-dom";


const Header = () => {
  const [menunav, showMenu] = useState(false)
  const [error, setError] = useState("");
  const [privateInfo, setPrivateInfo] = useState("");
  let history = useHistory();
  
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

  
  const handleOnClick = () => {
    console.log(privateInfo)
    toggle()
    localStorage.removeItem("authToken");

    history.push("/login");
    window.location.reload()
  };
  const toggle = () => {
    showMenu(!menunav)
  }
  return (
      <div className="header_top">
        <span className="header_top_brand">Iinvest</span>
        <button onClick={()=>showMenu(!menunav)} className='menu-header-btn'><CgMenuRight size={25} /></button>
      {menunav && error?<Navemenu1 logout={handleOnClick} showMenu={toggle}/>:menunav && !error &&<Navemenu logout={handleOnClick} showMenu={toggle}/>}
      </div>
  );
};

export default Header;
