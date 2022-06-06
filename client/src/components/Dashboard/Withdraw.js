import React, { useEffect, useState, useRef } from "react";
import {MdOutlineCancel, } from 'react-icons/md'
import Loader from "../Sheared/Loader";
import axios from "axios";


const Withdraw = ({ ballance, setWithdraw}) => {
    const [loading, setLoading] = useState(true)
    

    const [btcaddres, setBtcaddres] = useState('')
    const [amount, setAmount] = useState('')
    const ball = parseInt(ballance)

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(!loading)
            }, 1000);
        }
    }, [loading]);

  
    
  
  const handleSubmit = async (event) => {
         
    event.preventDefault();
   // console.log('www')
         const token = localStorage.getItem("authToken")
         const config = {
           headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
        try {
          const { data } = await axios.post(
            "/api/auth/make_withdraw",
            {
                amount: amount,
                address:btcaddres
            },
            config
          );

          if (data) {
            window.location.reload()
          }
          //localStorage.setItem("authToken", data.token);
         
        } catch (error) {
        
          setTimeout(() => {
            //setError("");
          }, 3000);
        }
      };
    
   
    
    


 
  





    if (loading) {
      return (
          <Loader/>
        );
    }
    return (
        <div className="db-deposit-menu">
           
            <MdOutlineCancel onClick={()=>setWithdraw(false)} className="db-menu-icon"/>
            <div className="db-deposit-menu-main">
            <div className='db-btc_address-details'>Enter your BTC Address</div>
          <input className='db-enter-amount'
            type="number" 
            placeholder="Amount" 
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
                />
                <input className='db-enter-amount'
            type="text" 
            placeholder="btc address" 
            onChange={(e) => setBtcaddres(e.target.value)}
            value={btcaddres}
            />
                
          <button onClick={handleSubmit} className={btcaddres!=='' && amount!=='' && ball>amount  ? "db-btc-sent-g" : "db-btc-sent"}
          disabled={amount==='' || ball<amount ? true : false}>Sent</button>
            </div>
            
            </div>
          );
    }
   

export default Withdraw;
