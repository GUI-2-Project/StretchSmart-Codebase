import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import bodyImage from '../assets/fullBodyFrontBack.png'
import leftArrow from '../assets/leftArrow.png'
import rightArrow from '../assets/rightArrow.png'

// Define the mutation (adjust based on your server's schema)
const ADD_ANSWERS = gql`
  mutation AddAnswers($answers: [AnswerInput!]!) {
    addAnswers(answers: $answers) {
      _id
      question
      answer
    }
  }
`;

const questions = [
  {
    id: 'q1',
    title: 'HOW ARE YOU FEELING TODAY?',
    options: ['Tired', 'Energetic', 'Moderate Energy'],
    multiple: true
  },
  {
    id: 'q2',
    title: 'WHAT ARE YOU FEELING IN YOUR -----',
    options: ['Soreness', 'Pain', 'Stiffness / Lack of Mobility', 'No Discomfort'],
    multiple: true
  },
  {
    id: 'q3',
    title: 'WHAT IS YOUR GOAL FOR TODAY\'S SESSION?',
    options: ['Pain Relief', 'Muscle Recovery', 'Improved Mobility', 'I Just Wanna Stretch!', 'Strength'],
    multiple: true
  },
  {
    id: 'q4',
    title: 'DO YOU HAVE ACCESS TO RESISTANCE BANDS?',
    options: ['Yes', 'No'],
    multiple: false
  }
];

const QuestionsPage = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    q1: [],
    q2: [],
    q3: [],
    q4: ''
  });
  const [addAnswers] = useMutation(ADD_ANSWERS);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChange = (e, multiple) => {
    const { name, value, checked } = e.target;
    if (multiple) {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [name]: checked
          ? [...prevAnswers[name], value]
          : prevAnswers[name].filter(option => option !== value)
      }));
    } else {
      setAnswers({
        ...answers,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const answersArray = Object.keys(answers).map(key => ({
      question: key,
      answer: Array.isArray(answers[key]) ? answers[key].join(', ') : answers[key]
    }));

    try {
      await addAnswers({ variables: { answers: answersArray } });
      console.log('Data saved to the database');
      navigate('/SideBar');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex(index => Math.max(index - 1, 0));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(index => Math.min(index + 1, questions.length - 1));
  };

  const styles = {
    frontPage: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    mainContent: {
      display: 'flex',
      flex: 1,
    },
    leftSide: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: 'calc(100% - 600px)',
      backgroundColor: '#ECECEC',
      margin: '40px 80px',
      borderRadius: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
      paddingTop: '70px',
    },
    imageContainer: {
      flexBasis: '600px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: '70px',
    },
    staticImage: {
      width: '500px',
      height: '100%',
      display: 'block',
    },
    questionsTitle: {
      color: '#2364E2',
      fontSize: '25px',
      textAlign: 'center',
      fontWeight: '700',
      padding: '40px',
    },
    question: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    options: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '30%',
      paddingBottom: '30px'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
    },
    checkbox: {
      margin: '20px 30px',
      paddingRight: '15px',
      transform: 'scale(2)',
      WebkitTransform: 'scale(2)',
    },
    navigationButtonRight: {
      display: 'flex',
      margin: '20px 0',
      cursor: 'pointer',
    },
    navigationButtonLeft: {
      display: 'flex',
      margin: '20px 0',
      cursor: 'pointer',
    },
    navButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#2364E2',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      borderRadius: '20px'
    },
    submitButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#2364E2',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      margin: '20px auto',
      display: 'block'
    }
  };

  return (
    <div style={styles.frontPage}>
      <main style={styles.mainContent}>
        <div style={styles.leftSide}>
          <form onSubmit={handleSubmit}>
            {questions.slice(currentQuestionIndex, currentQuestionIndex + 1).map((q) => (
              <div key={q.id}>
                <h2 style={styles.questionsTitle}>{q.title}</h2>
                <div style={styles.question}>
                  <div style={styles.options}>
                    {q.options.map((option, index) => (
                      <label key={index} style={styles.label}>
                        <input
                          type={q.multiple ? 'checkbox' : 'radio'}
                          name={q.id}
                          value={option}
                          checked={q.multiple ? answers[q.id].includes(option) : answers[q.id] === option}
                          onChange={(e) => handleChange(e, q.multiple)}
                          required={!q.multiple}
                          style={styles.checkbox}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div style={styles.navigationButtonLeft}>
                  {currentQuestionIndex > 0 && (
                    <img
                      src={leftArrow}
                      onClick={prevQuestion}
                      alt="Previous Question"
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
                <div style={styles.navigationButtonRight}>
                  {currentQuestionIndex < questions.length - 1 && (
                    <img
                      src={rightArrow}
                      onClick={nextQuestion}
                      alt="Next Question"
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
                {currentQuestionIndex === questions.length - 1 && (
                  <button type="submit" style={styles.submitButton}>
                    Submit
                  </button>
                )}
                 <div style={styles.imageContainer}>
            <img src={bodyImage} style={styles.staticImage} alt="Body Image" />
          </div>
              </div>
            ))}
          </form>
        </div>
      </main>
    </div>
  );
};
  
export default QuestionsPage;
