import React, { useEffect, useState } from "react";
import axios from "axios";
import "./adm.css";
import Loader from "../Sheared/Loader";
import Transaction from "./Transactions";


//console.log(token)

const Adm = () => {
   
      
    const [dbdata, setDbdata] = useState({});
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        async function getUserData()
        {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : `Bearer ${token}`
                },
            };
            const { data } = await axios.get(
                "/api/auth/get_all_transaction_details",
                config
            );
            if (data) {
                console.log(data.trans[0])
              setDbdata(data.trans)
               setLoading(false)
            }
            
        }

         getUserData()
    },[])

    useEffect(() => {
        console.log(dbdata)
    },[dbdata])
  

    if (loading) {
       // console.log('loading')
    return <Loader/>
}
  return (
      <div className="Adm">
          
          
          <div className="db-recent">Recent Transactions</div>
          <div className="db-trans">
              {
                  dbdata.map((e, i) => {
                      return <Transaction
                          key={i}
                          date={e.date}
                          type={e.type}
                          amount={e.amount}
                          status={e.status}
                          address={e.address}
                          user={e.user}
                          _id={e._id}
                      />
                })
              }
          </div>
    </div>
  );
};

export default Adm;
