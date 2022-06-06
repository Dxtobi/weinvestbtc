import React from "react";
import "./Landing1.css";
import {Component, SimpleSlider} from './Top1'
import { Link } from "react-router-dom";
import Plans from '../Dashboard/Plans.js'
import Footer from '../Sheared/Footer.js'

const Landing2 = () => {
  return (
    <div className='home-no-auth'>
      <div className='cd-div-con'><SimpleSlider /></div>
      
          <div className="about-us-landing">
              <div className="about-we-do">
                  <h3>Who are we?</h3>
                  <span className="awd-header">We are a Bitcoin investment company.</span>
                  <img src='./wedo.png' alt='' className="awd-img"/>
                  <p>
                  We are creating a unique platform, a Bitcoin ecosystem for both advance and novice Bitcoin Entrepreneurs.
                  </p>
                  <br />
                  <br/>
                  <Link className='login-home' to='/login'>Get Started</Link>
              </div>
              <div className="about-vision">
                    <h3>Whats Our Vision?</h3>
                    <span className="awd-header-v">Bitcoin Adoptability.</span>
                    <img src='./serve.png' alt='' className="awd-img"/>
                    <p>
                    Our vision here is promoting a wilder range of Bitcoin profitability system, to open a window for Bitcoin investments.
                  </p>
                  <br />
                  <br/>
                  <Link className='login-home-v' to='/login'>Tag Along</Link>
              </div>
          </div>
          <div className='why-us'>
                    <h3>What we Bring to the table</h3>
                    <span className="awd-header">We are the table.</span>
                    <p>
                        We offer an investment scheme that allows our subscribers
                        make up to 70% of their Bitcoin investment within 48 hours (2 days) of investing.
                        depending on selected plan.
                    </p>
          </div>
          <div className='why-us'>
                    <h3>Others view about us</h3>
          </div>
          <div className='about-slide'>
                <Component/>
          </div>
          <div><Plans /></div>
          <div className="img-footer-cont">
            <img src='/wib.png' alt="" className="img-f"/>
          </div>
          <div><Footer /></div>
    </div>
  );
};

export default Landing2;
