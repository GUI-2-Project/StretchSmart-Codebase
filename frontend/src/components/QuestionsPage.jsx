import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import bodyImage from '../assets/fullBodyFrontBack.png';
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';
import {useLocation} from 'react-router-dom';
import { UserContext } from './ContentWrapper';
import { useQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../queries/questionQueries';

function QuestionsPage() {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    // accept 'muscleName' arg from previous page
    // const location = useLocation();
    //const muscleName = location.state.muscleName;   
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigate = useNavigate(); // Initialize useNavigate
    const [selections, setSelections] = useState(
        currentUser.questionnaireSelections || {}
    );

    // Redirect to landing page if muscleName is not set
    const muscleName = currentUser.muscleName;
    if (!muscleName) {
        navigate('/landing');
    }
    
    // load questions
    const { loading, error, data } = useQuery(GET_QUESTIONS);
    if (loading) return <p>Loading...</p>;// <Spinner />; // TODO: improve
    if (error) return <p>Something Went Wrong</p>;
    const questions = data.questions;


    const questionAnswered = (questionIndex) => {
        const question = questions[questionIndex];
        if (question.selectionType === 'single') {
            return selections[questionIndex] !== undefined;
        } else {
            return Object.values(selections[questionIndex] || {}).some(value => value);
        }
    }

    const allQuestionsAnswered = () => {
        return questions.every((question) => {
            const index = question.index;
            if (question.selectionType === 'single') {
                return selections[index] !== undefined;
            } else {
                return Object.values(selections[index] || {}).some(value => value);
            }
        });
    };

    const isAnyCheckboxSelected = () => {
        return Object.values(selections).some(option => 
            typeof option === 'object' ? Object.values(option).some(value => value) : option
        );
    };

    const nextQuestion = () => {
        if (!questionAnswered(currentQuestionIndex)) {
            alert('Please select at least one option before moving on.');
        } else if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSelectionChange = (optionIndex) => {
        const questionIndex = questions[currentQuestionIndex].index;
        if (questions[currentQuestionIndex].selectionType === 'single') {
            setSelections({
                ...selections,
                [questionIndex]: optionIndex
            });
        } else {
            setSelections({
                ...selections,
                [questionIndex]: {
                    ...selections[questionIndex],
                    [optionIndex]: !selections[questionIndex]?.[optionIndex]
                }
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allQuestionsAnswered() && isAnyCheckboxSelected()) {

            // Save selections to currentUser's session
            currentUser.questionnaireSelections = selections;

            // Nav to muscle overview page and pass selected muscle name
            navigate('/muscle-overview', {state: {muscleName: muscleName}});
        } else {
            alert('Please answer all questions and select at least one checkbox before submitting.');
        }
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
            paddingTop: "70px",
            position: 'relative', // Ensure the position is relative for child absolute positioning
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
            fontWeight: "700",
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
        label: {},
        checkbox: {
            margin: "20px 30px",
            paddingRight: '15px',
            transform: 'scale(2)',
            WebkitTransform: 'scale(2)',
        },
        navigationContainer: {
            alignItems: 'center',
            position: 'absolute',
            top: '70%',
            left: '60%',
            gap: '100px'
        },
        navButtonLeft: {
            cursor: 'pointer',
            margin: '0 10px', // Adjust the spacing between buttons
           
        },
        navButtonRight: {
            cursor: 'pointer',
            margin: '0 10px', // Adjust the spacing between buttons
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
                    <h2 style={styles.questionsTitle}>{questions[currentQuestionIndex].question}</h2>
                    <div style={styles.question}>
                        <div style={styles.options}>
                            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                                <label key={optionIndex} style={styles.label}>
                                    <input 
                                        type={(questions[currentQuestionIndex].selectionType == "single")  ? 'radio' : 'checkbox'}
                                        style={styles.checkbox}
                                        checked={(questions[currentQuestionIndex].selectionType == "single") ? selections[questions[currentQuestionIndex].index] === optionIndex : selections[questions[currentQuestionIndex].index]?.[optionIndex] || false}
                                        onChange={() => handleSelectionChange(optionIndex)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={styles.navigationContainer}>
                        {currentQuestionIndex > 0 &&
                            <img src={leftArrow} onClick={prevQuestion} alt="Previous" style={styles.navButtonLeft}/>
                        }
                        {currentQuestionIndex < questions.length - 1 &&
                            <img src={rightArrow} onClick={nextQuestion} alt="Next" style={styles.navButtonRight}/>
                        }
                    </div>
                    {currentQuestionIndex === questions.length - 1 &&
                        <button onClick={handleSubmit} style={styles.submitButton}>
                            Submit
                        </button>
                    }
                </div>
                <div style={styles.imageContainer}>
                    <img src={bodyImage} style={styles.staticImage} alt="Body Image" />
                </div>
            </main>
        </div>
    );
}

export default QuestionsPage;
