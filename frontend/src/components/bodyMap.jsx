import React, { useState } from 'react';
import arrowleft from '../assets/arrow-left.svg';
import fullBody from '../assets/BodyScaled.png';
import '../index.css';
import '../output.css';
const Body = () => {

  return (
    <div >
        <img src={fullBody} usemap="#image-map"/>
        <map name="image-map" >
            <area target="" alt="chest" title="chest" href="" coords="55,230,187,290" shape="rect"/>
            <area target="" alt="shoulder" title="shoulder" href="" coords="15,247,25,278,51,253,77,219,49,215,33,216" shape="poly"/>
        </map>
    </div>
 )
};

export default Body;
