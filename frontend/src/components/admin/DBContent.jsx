import React from 'react'
import { gql, useQuery } from '@apollo/client'
import MuscleGroupRow from './MuscleGroupRow'
import StretchRow from './StretchRow'
import QuestionRow from './QuestionRow'

// Query backed for list of questions for questionnaire
const GET_QUESTIONS = gql`
    query GetQuestions {
        questions {
            id
            question
            options
        }
    }
`;

// Query backed for list of muscles
const GET_MUSCLE_GROUPS = gql`
    query GetMuscleGroups {
        muscleGroups {
            id
            name
            imageURL
        }
    }
`;

// Query backed for list of stretches
const GET_STRETCHES = gql`
    query GetStretches {
        stretches {
            id
            title
            description
            goodFor
            badFor
            imageURL
            instructions
        }
    }
`;

const DBContent = () => {
    // Destructure muscles, stretches, and questions from backend
    // loading - true if data is still being fetched
    const questions = useQuery(GET_QUESTIONS);
    const muscles = useQuery(GET_MUSCLE_GROUPS);
    const stretches = useQuery(GET_STRETCHES);

    let loadingAny = muscles.loading || stretches.loading || questions.loading;
    let errorAny = muscles.error || stretches.error || questions.error;

    if (loadingAny) return <p>Loading...</p>;
    if (errorAny) return <p>Something Went Wrong</p>;

    return (
        <>
            { !loadingAny && !errorAny && 
                <>
                    {/* {questions.data.questions.map(question => ( <QuestionRow question={question}/> ))} */}
                    {/* {muscles.data.muscles.map(muscle => ( <MuscleGroupRow muscleGroup={muscle}/> ))} */}
                    {stretches.data.stretches.map(stretch => ( <StretchRow stretch={stretch}/> ))}
                </>
            }
        </>
    )
}

export default DBContent