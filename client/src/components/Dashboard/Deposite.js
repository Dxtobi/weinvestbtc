import React, { useEffect, useState, useRef } from "react";
import {MdOutlineCancel, } from 'react-icons/md'
import Loader from "../Sheared/Loader";
import axios from "axios";


const Deposite = ({btcadd, setDeposit}) => {
    const [loading, setLoading] = useState(true)
    const [copy, setCopySuccess] = useState('')
  const [picked, setPicked] = useState(false)
  const [amount, setAmount] = useState('')
    
  
    const inputArea = useRef(null);
    
    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(!loading)
            }, 1000);
        }
    }, [loading]);

    useEffect(() => {
        if (copy!==''||copy!==''||copy==="Copied!"||copy==="Copy failed!") {
            setTimeout(() => {
                setCopySuccess('')
               }, 10000);
        }
       },[copy])
    
  
  const handleSubmit = async (event) => {
         
    event.preventDefault();
    console.log('www')
         const token = localStorage.getItem("authToken")
         const config = {
           headers: {
             "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`
           },
         }
        try {
          const { data } = await axios.post(
            "/api/auth/make_transfer",
            {
             amount:amount
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
    
    function updateClipboard(newClip) {
        navigator.clipboard.writeText(newClip).then(
          () => {
            setCopySuccess("Copied!");
          },
          () => {
            setCopySuccess("Copy failed!");
          }
        );
      }
      
    function copyLink() {
        setPicked(!picked)
        navigator.permissions
          .query({ name: "clipboard-write" })
          .then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
              updateClipboard(inputArea.current?.innerText);
            }
          });
    }
    


 
  





    if (loading) {
      return (
          <Loader/>
        );
    }
    return (
        <div className="db-deposit-menu">
            {copy !== '' && <div className="db-deposit-menu-toast">Copied!</div>}
            <MdOutlineCancel onClick={()=>setDeposit(false)} className="db-menu-icon"/>
            <div className="db-deposit-menu-main">
            <div className='db-btc_address-details'>Make Payment to to this Address</div>
          <input className='db-enter-amount'
            type="number" min="0.00"
            max="10000.00" step="0.01"
            placeholder="500" 
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            />
                <div onClick={copyLink} ref={inputArea} className="db-btc_address">{btcadd}</div>
          <button onClick={handleSubmit} className={amount !== '' ? "db-btc-sent-g" : "db-btc-sent"}
          disabled={amount==='' ? true : false}>Sent</button>
            </div>
            
            </div>
          );
    }
   

export default Deposite;
