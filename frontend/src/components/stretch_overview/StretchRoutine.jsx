import React, { useState } from 'react'
import StretchStepParser from './StretchStepParser';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const StretchRoutine = ({ muscleGroup }) => {
  const stretches = muscleGroup.stretches;
  const [index, setIndex] = useState(0);
  const [tail, setTail] = useState(stretches.length - 1);
  const [currentStretch, setCurrentStretch] = useState(stretches[index]);
  const [countdownPlaying, setCountdownPlaying] = useState(false);
  const [key , setKey] = useState(0);

  //let prevStretch = (current <= 0) ? null : stretches[current - 1];
  //let nextStretch = (tail - current < 0) ? null : stretches[current + 1];
  const getNextStretch = () => {
    return (tail - index < 0) ? null : stretches[index + 1];
  };

  const getPrevStretch = () => {
    return (index <= 0) ? null : stretches[index - 1];
  };

  const resetTimer = () => {
    setKey(prevKey => (prevKey + 1) % 2);
  }

  const startTimer = () => {
    setCountdownPlaying(true);
  };

  const stopTimer = () => {
    setCountdownPlaying(false);
  };

  const incrementStretch = () => {
    if (index < tail) {
      // These need to be ordered this way
      // because setIndex takes too long to run
      // leading to a race condition
      // causing setCurrentStretch to behave
      // unpredictably
      setCurrentStretch(stretches[index+1]);
      setIndex(index+1);
      stopTimer();
      resetTimer();
    }
  };

  const decrementStretch = () => {
    if (index > 0) {
      setCurrentStretch(stretches[index-1]);
      setIndex(index-1);
      stopTimer();
      resetTimer();
    }
  };

  const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 150px)',
        padding: '20px',
        backgroundColor: '#fff',
        margin: 'auto',
        marginTop: '75px',
        //maxWidth: '800px',
        //maxHeight: '600px'
        height: '90%',
        width: '90%'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        //maxWidth: '800px',
        position: 'relative',
        top: '0',
        alignSelf: 'flex-start'
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'left'
    },
    form: {
        display: 'flex',
        gridColumn: '1',
        flexDirection: 'column',
        width: '100%',
        gap: '10px'
    },
    input: {
        padding: '10px',
        width: '100%',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxSizing: 'border-box'
    },
    button: {
        padding: '15px',
        width: '100%',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        frontSize: '20px',
        cursor: 'pointer'
    },
    error: {
        color: 'red',
        marginBottom: '10px'
    },
    success: {
        color: 'green',
        marginBottom: '10px'
    },
    text: {
        textAlign: 'left',
        marginTop: '20px',
        fontSize: '24px',
        color: '#666'
    },
    image: {
        borderRadius: '10px',
        margin: 'auto',
        padding: '20px'
    },
    timerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        marginTop: '20px'
    },
    instructionsContainer: {
      fontSize: '20px',
    }
};

  return (
    <div>
        <h2 style={styles.title}>{currentStretch.title}</h2>
        <div sytle={styles.form}>
            <p style={styles.text}>{currentStretch.description}</p>
            <img src={currentStretch.imageURL} style={styles.image}/>
        </div>
        <div style={styles.instructionsContainer}>
            <StretchStepParser stretchInstructions={currentStretch.instructions}/>
        </div>
        <div style={styles.timerContainer}>
        { (countdownPlaying) ? (
          <CountdownCircleTimer
            isPlaying={countdownPlaying}
            key={key}
            duration={currentStretch.durationSeconds}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[15, 7, 3, 0]}
            size={300}
            onComplete={ async () => {await new Promise(resolve => setTimeout(resolve, 1000)) ; incrementStretch();} }
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        ) : (
          <button className='btn btn-primary' onClick={startTimer} style={styles.button}>Ready to stretch?</button>
        )}
          { (getPrevStretch() != null) && (
            <button className='btn btn-primary' onClick={decrementStretch} style={styles.button}>Previous Stretch</button>
          )}

          { (getNextStretch() != null) && (
            <button className='btn btn-primary' onClick={incrementStretch} style={styles.button}>Next Stretch</button>
          )}
        </div>
    </div>
  )
}

export default StretchRoutine