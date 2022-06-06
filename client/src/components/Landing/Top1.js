import React, {useRef} from 'react'
import { Rerousel, } from 'rerousel';
import Slider from "react-slick"
import {BsTwitter} from 'react-icons/bs'


const info = [
    {
        text: 'Up to 70% return on your first deposit',
        img: '/btc1.png'
        
    },
    {
        text: 'Easy investment equal Easier Life ',
        img: '/inv.png'
        
    },
    {
        text: 'Simple user interface, easy navigation',
        img: '/ui.png'
        
    },
    
];

const info_about = [
    {
        text: 'This is a better way to invest in BTC.',
        n: '@JasonPLowery',
        h: 'Jason Lowery',
        ui:'/userjl.jpg'
        
    },
    {

        text: 'Seriously the best platform ever.',
        n: '@diwu1989',
        h: 'Di Wu',
        ui:'/userdi.png'
        
    },
    {
        text: 'Customer care service if five star.',
        n: '@bitcoinmoonbow',
        h:'Bitcoin Moonbow',
        ui:'/userbm.jpg'
    },
   
    {
        text: 'Wish i found this platform earlier.',
        n: '@programmer_dex',
        h:'Joseph Akanbi',
        ui:'/dx.jpg'
    },
];



export function SimpleSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: false,
        arrows: false,
        autoplaySpeed:4000
    };
    return (
      <Slider {...settings}>
        {info.map((c, i) => {
                    return <div key={i}  ><Ci indx={i} text={c.text} img={c.img} /></div>;
                })}
      </Slider>
    );
  }











export const Component = () => {
    const customerLogo = useRef(null);

    return (
        <div>
            <Rerousel itemRef={customerLogo}>
                {info_about.map((c, i) => {
                    
                    return <div key={i} ref={customerLogo} className='cd-div-con-f'><Info_foot  indx={i} text={c.text} img={c.ui} h={c.h} u={c.n} /></div>;
                })}
            </Rerousel>
        </div>
    );
};
const Ci = ({ text, img, indx }) => {
    //console.log(indx)
        return (
            <div className={'ci-div-'+indx}>
                <div className='ci-text'>{text}</div>
                <div className='ci-img-div'><img src={img } alt="" className='ci-img'/></div>
            </div>
        );
    }



    const Info_foot = ({ text, img,u,h }) => {
        //console.log(indx)
            return (
                <div className={'ci-div-f'}>
                    <div className='ci-img-div-f'><img src={img } alt="" className='ci-img-f'/></div>
                    <div className='ci-text-f'>{h}</div>
                    <div className='ci-text-f-h'>{text}</div>
                   
                   <br/>
                    <BsTwitter size={20} color={ 'rgb(29 155 240)'}/>
                    <div className='ci-text-f-n'>{u}</div>
                </div>
            );
        }