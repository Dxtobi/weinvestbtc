import React, { useEffect, useState } from "react";
//import {MdOutlineCancel, } from 'react-icons/md'
import Loader from "../Sheared/Loader";
import './plan.css'
import axios from "axios";
import { useHistory } from "react-router-dom";
const token = localStorage.getItem("authToken")

const Plans = ({ history }) => {
   const [loading, setLoading] = useState(true)
  
const hs = useHistory()
    
    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }, [loading]);

    async function setUserPlan(e) {
        if (!token) {
            return hs.push("/login");
        }
        {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            };
            const { data } = await axios.post(
                "/api/auth/set_subscription_plan",
                { plan: e },
                config
            );
            if (data) {
                setLoading(true)
                history.push("/dashboard");
                //setLoading(false)
            }
        
        }
    }

    if (loading) {
      return (
          <Loader/>
        );
    }
 
    return (
        <div className="plan_main-Screen">
            <div className="plans-info">
                <div className="plans-info-h">Select a plan</div>
                <div className="plans-info-i">
                    The plan you select is what determines your return in investment.<br />
                    Transaction costs are not determine by your plan but rather by the blockchain network.
                </div>
            </div>
            <div className="plan_Screen">
            <div onClick={()=>setUserPlan('Bronze')} className="card-wrap one">
            <div className="card-header">
                <h1>bronze</h1>
            </div>
            <div className="card-content">
            <p className="card-content-option true">Return 48 Hours</p>
                <p className="card-content-option true">Return in %40</p>
                <p className="card-content-option true">Bonus of %2</p>
                <p className="card-content-option false">Multiple Deposit</p>
            </div>
            <div className="card-footer">
                <p>A starter plan with minimum of $100 and a maximum of $900.</p>
                <button onClick={()=>setUserPlan('Bronze')} className="card-footer-btn">Select</button>
            </div>
            </div>
            <div onClick={()=>setUserPlan('Silver')} className="card-wrap two">
            <div className="card-header">
                <h1>silver</h1>
            </div>
            <div className="card-content">
                <p className="card-content-option true">Return 48 Hours</p>
                <p className="card-content-option true">Return in %50</p>
                <p className="card-content-option true">Bonus of %5</p>
                <p className="card-content-option true">Multiple Deposit</p>
            </div>
            <div className="card-footer">
                <p>A starter plan with minimum of $1,000 and a maximum of $9,000.</p>
                <button onClick={()=>setUserPlan('Silver')} className="card-footer-btn">Select</button>
            </div>
            </div>
            <div onClick={()=>setUserPlan('Gold')} className="card-wrap three">
            <div className="card-header">
                <h1>gold</h1>
            </div>
            <div className="card-content">
                <p className="card-content-option true">Return 48 Hours</p>
                <p className="card-content-option true">Return in %70</p>
                <p className="card-content-option false">Bonus of %5</p>
                <p className="card-content-option true">Multiple Deposit</p>
            </div>
            <div className="card-footer">
                <p>A starter plan with minimum of $10,000 and a maximum of $90,000.</p>
                <button onClick={()=>setUserPlan('Gold')} className="card-footer-btn">Select</button>
            </div>
            </div>
            </div>
            <div className='plans-info-footer'>
                <div className="plans-info">
                    <div className="plans-info-h">Silver</div>
                    <div className="plans-info-i">
                    13,000+ users
                    </div>
                </div>
                <div className="plans-info">
                    <div className="plans-info-h">Bronze</div>
                    <div className="plans-info-i">
                    9,000+ users
                    </div>
                </div>
                <div className="plans-info">
                    <div className="plans-info-h">Gold</div>
                    <div className="plans-info-i">
                    7,000+ users
                    </div>
                </div>
            </div>
        </div>
          );
    }
   

export default Plans;
