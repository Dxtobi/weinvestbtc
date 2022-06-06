import React
//{ useState }
  from "react";
import { MdDashboard, MdHomeFilled, MdPriceChange } from 'react-icons/md';
import { Link } from "react-router-dom";

import "./header.css";

const Navemenu1 = ({showMenu}) => {

  return (
      <div className="nav-bar-div">
          <button onClick={showMenu} className='nav-bar-div-btn-close'>Close</button>
          <div className='nav-bar-div-sub'>
              <span className='nav-bar-item'>Hello</span>
              <Link to='/'  onClick={showMenu} className='nav-bar-item'><MdHomeFilled/><span className='lni'>Home</span></Link>
              <Link to='/dashboard' onClick={showMenu} className='nav-bar-item'><MdDashboard/><span className='lni'>Dashboard</span></Link>
              <Link to='/plans' onClick={showMenu} className='nav-bar-item'><MdPriceChange/><span className='lni'>Plans</span></Link>
              <span className='nav-bar-divider'></span>
          </div>

          <Link to='/login' onClick={showMenu} className='nav-bar-div-btn-log'>Login</Link>
      </div>
  );
};

export default Navemenu1;
