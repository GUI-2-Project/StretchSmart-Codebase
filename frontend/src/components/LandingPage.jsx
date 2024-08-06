import React, { useState } from 'react';
import frontBody from '../assets/fullBodyFront.png';
import fullBody from '../assets/fullBodyFrontBack.png';
import backBody from '../assets/fullBodyBack.png';
import Body from '../components/bodyMap';
import '../components/stretch_overview/landingPage.css';

const LandingPage = () => {
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [isFrontView, setIsFrontView] = useState(true);

    const handleMuscleSelect = (muscle) => {
        setSelectedMuscle(muscle);
    };

    const toggleView = () => {
        setIsFrontView(!isFrontView);
    };

    return (
        <div className="frontPage">
            <main className="mainContent">
                <h1 className="leftSide">Please select a muscle group</h1>
                <div className="imageContainer">
                    <Body onMuscleSelect={handleMuscleSelect} />
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
