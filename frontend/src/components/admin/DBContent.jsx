import React from 'react'
import { gql, useQuery } from '@apollo/client'

// Import table components for each type of content in DB
import Questions from './Questions';
import MuscleGroups from './MuscleGroups';
import Stretches from './Stretches';

// Import queries
import { GET_QUESTIONS } from '../../queries/questionQueries';
import { GET_MUSCLE_GROUPS } from '../../queries/muscleGroupQueries';
import { GET_STRETCHES } from '../../queries/stretchQueries';


const DBContent = () => {
    // Query backend for list of questions for questionnaire
    const questions = useQuery(GET_QUESTIONS);
    const muscles = useQuery(GET_MUSCLE_GROUPS);
    const stretches = useQuery(GET_STRETCHES);

    // guard for failed or hanging queries
    let loadingAny = muscles.loading || stretches.loading || questions.loading;
    let errorAny = muscles.error || stretches.error || questions.error;
    if (loadingAny) return <p>Loading...</p>;
    if (errorAny) return <p>Something Went Wrong</p>;

    return (
        <>
            { !loadingAny && !errorAny && 
                <>
                    <Questions />
                    <MuscleGroups />
                    <Stretches />
                </>
            }
        </>
    )
}

export default DBContent