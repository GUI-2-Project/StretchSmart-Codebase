import React, { useState } from 'react';
//import arrowleft from '../assets/arrow-left.svg';
import fullBody from '../assets/BodyScaled.png';
import '../index.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const Body = ({ onMuscleSelect }) => {  // TODO: rename to BodyMap for clarity
  const navigate = useNavigate();

  const handleAreaClick = (muscle) => {
    onMuscleSelect(muscle);
    navigate('/questionnaire');
  };
  
  return (
    <div >
        <img src={fullBody} useMap="#image-map"/>
        <map name="image-map">
            <area target="" alt="chest" title="chest" href="" coords="55,230,187,290" shape="rect"
              onClick={(e) => {
                e.preventDefault();
                handleAreaClick('chest');
              }}/>
            <area target="" alt="shoulder" title="shoulder" href="" coords="15,247,25,278,51,253,77,219,49,215,33,216" shape="poly"
            onClick={(e) => {
              e.preventDefault();
              handleAreaClick('shoulder');
            }}/>
        </map>
    </div>
 )
};

export default Body;  // TODO: rename to BodyMap for clarity
