import React from 'react'
import { Link } from "react-router-dom";
import { AiFillFacebook, AiFillInstagram, AiOutlineWhatsApp } from "react-icons/ai";
import {  FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  
  
  const contact = [
    {
      header: "Client services",
      text:"(616) 799-7597"
    },
    {
      header: "e-Mail",
      text:"weinvestbtccare@gmail.com"
    },
  ]
  const naves = [
    {
      link: "https://wa.me/message/LESMPJVUPE3OB1",
      text:"Support"
    },
    {
      link: "https://wa.me/message/LESMPJVUPE3OB1",
      text:"Partnership"
    },
  ]
  return (
    <div className="footer_main">
      <div className='footer_nav'>
        {naves.map((e, i) => {
          return (<Link key={i} className="footer_links_nave" to={e.link}>{e.text}</Link>)
          })}
      </div>
      <div className='footer_contact'>
        {contact.map((e, i) => {
          return (<div key={i} className="footer_contact_nave" >
            <div className='footer_header_lst'>{e.header}</div>
            <div className='footer_header_txt'>{e.text}</div>
          </div>)
          })}
      </div>

      <div className='footer_contact_soc'>
        <a href='https://www.facebook.com/We-Invest-Btc-105595135514513/' target='_blank' className='footer_soc_a'><AiFillFacebook /></a>
        <a href='https://instagram.com/weinvestbtc?r=nametag' target='_blank' className='footer_soc_a'><AiFillInstagram /></a>
        <a href='https://wa.me/message/LESMPJVUPE3OB1' target='_blank' className='footer_soc_a'><AiOutlineWhatsApp /></a>
        <a href='https://t.me/weinvestbitcoin' target='_blank' className='footer_soc_a'><FaTelegramPlane/></a>
      </div>

      
      <div className='footer_copy'>
        <p>
          Copyright Weinvestbtc Saving and Investment Limited. 
          Bigpay is a registered trade mark of Bigpay Saving And Investment Limited,
          authorized and regulated by the Federal Conduct Authority, no.552016,
          registered in England and Wales, no. 07503666, with a registered office at 25 Bank Street,
          Canary Wharf, London E14 5JP. Smart Alpha is trade mark of Schroders plc and is used under
          license.
          </p>
      </div>
    </div>
  )
}
