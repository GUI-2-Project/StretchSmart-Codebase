import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import bodyImage from '../assets/fullBodyFrontBack.png';
import leftArrow from '../assets/leftArrow.png';
import rightArrow from '../assets/rightArrow.png';
import {useLocation} from 'react-router-dom';
import { UserContext } from '../App';

function QuestionsPage() {

    // accept 'muscleName' arg from previous page
    const location = useLocation();
    const muscleName = location.state.muscleName;   

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selections, setSelections] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate

    const questions = [
        {
            id: 'q1',
            title: `HOW ARE YOU FEELING TODAY?`,
            options: [
                'Tired',
                'Energetic',
                'Moderate Energy'
            ]
        },
        {
            id: 'q2',
            title: `WHAT ARE YOU FEELING IN YOUR ` + muscleName.toUpperCase() + `?`,
            options: [
                'Soreness',
                'Pain',
                'Stiffness / Lack of Mobility',
                'No Discomfort'
            ]
        },
        {
            id: 'q3',
            title: `WHAT IS YOUR GOAL FOR TODAY'S SESSION?`,
            options: [
                'Pain Relief',
                'Muscle Recovery',
                'Improved Mobility',
                'I Just Wanna Stretch!',
                'Strength'
            ]
        },
        {
            id: 'q4',
            title: `DO YOU HAVE ACCESS TO RESISTANCE BANDS?`,
            options: [
                'Yes',
                'No'
            ]
        }
    ];

    const allQuestionsAnswered = () => {
        return questions.every((question) => {
            const id = question.id;
            if (question.title.includes('ACCESS')) {
                return selections[id] !== undefined;
            } else {
                return Object.values(selections[id] || {}).some(value => value);
            }
        });
    };

    const isAnyCheckboxSelected = () => {
        return Object.values(selections).some(option => 
            typeof option === 'object' ? Object.values(option).some(value => value) : option
        );
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSelectionChange = (option) => {
        const questionId = questions[currentQuestionIndex].id;
        if (questions[currentQuestionIndex].title.includes('ACCESS')) {
            setSelections({
                ...selections,
                [questionId]: option
            });
        } else {
            setSelections({
                ...selections,
                [questionId]: {
                    ...selections[questionId],
                    [option]: !selections[questionId]?.[option]
                }
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allQuestionsAnswered() && isAnyCheckboxSelected()) {
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
                    <h2 style={styles.questionsTitle}>{questions[currentQuestionIndex].title}</h2>
                    <div style={styles.question}>
                        <div style={styles.options}>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <label key={index} style={styles.label}>
                                    <input 
                                        type={questions[currentQuestionIndex].title.includes('ACCESS') ? 'radio' : 'checkbox'}
                                        style={styles.checkbox}
                                        checked={questions[currentQuestionIndex].title.includes('ACCESS') ? selections[questions[currentQuestionIndex].id] === option : selections[questions[currentQuestionIndex].id]?.[option] || false}
                                        onChange={() => handleSelectionChange(option)}
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
