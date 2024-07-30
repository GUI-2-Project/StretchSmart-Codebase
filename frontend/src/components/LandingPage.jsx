import React, { useState } from 'react';
//import arrowleft from '../assets/arrow-left.svg';
import frontBody from '../assets/fullBodyFront.png';
import fullBody from '../assets/fullBodyFrontBack.png';
import backBody from '../assets/fullBodyBack.png';
import Body from '../components/bodyMap'
import '../index.css';

const LandingPage = ({ onMuscleSelect }) => {
  const [isFrontView, setIsFrontView] = useState(true);
  
  const toggleView = () => {
    setIsFrontView(!isFrontView);
  };
  const styles = {
    frontPage: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: 'full'
    },
    mainContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flex: 1,
    },
    leftSide: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70vh',
        width: 'calc(100% - 600px)',
        marginTop:'300px',
        fontSize: '50px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
    },
    imageContainer: {
        flexBasis: '600px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '70px',
    },
    staticImage: {
        width: '270px',
        height: '100%',
        display: 'block',
    },
    questionsTitle: {
        color: '#2364E2',
        fontSize: '30px',
        textAlign: 'center',
        fontWeight: "700",
    },
    h1: {
      width:" 270px",
      display:"flex",
      flexDirection: 'column',
      fontSize: '50px',
    }

  };
  return (
    <div style={styles.frontPage}>
        <main style={styles.mainContent}>
           <h1 style={styles.leftSide}>Please select a muscle group</h1>
            <div>
                <Body onMuscleSelect={onMuscleSelect}/>
            </div>
        </main>
    </div>
     
)
};

export default LandingPage;
